"use strict";

var _ = require( "lodash" );
var validator = require( 'is-my-json-valid' );
var isValidRepresentation = validator( {
  "$schema"              : "http://json-schema.org/draft-04/schema#",
  "required"             : true,
  "title"                : "Representation",
  "type"                 : "object",
  "properties"           : {
    "_id"      : {
      "type"     : "string",
      "required" : true
    },
    "compared" : {
      "description" : "List of representation id's this representation has been compared to.",
      "type"        : "array",
      "items"       : {
        "type" : "string"
      },
      "uniqueItems" : false,
      "minItems"    : 0,
      "required"    : true
    }
  },
  "additionalProperties" : true
} );

/**
 * Simple comparative selection algorithm
 * @param {Object[]} items - Array of items with following minimal structure:
 * @param {string} items[]._id - Unique identifier for the item
 * @param {string[]} items[].compared - Array of unique identifiers
 * @param {Number} items[].comparedNum - Number of times the item has already been compared.
 * (this is _not_ necessarily items[].compared.length, since an item could be compared to the same item multiple times.
 */
function select( items ){
  if( !items || !_.isArray( items ) || 2 > items.length ){
    throw new Error( "comparative-selection#select: `items` should be an Array with a minimum length of 2" );
  } else {
    _.each( items, function( item ){
      if( !isValidRepresentation( item ) ){
        throw new Error( 'comparative-selection#select: invalid representation structure: ' + JSON.stringify( item ) );
      }
    } );
    items = _.sortBy( _.shuffle( items ), function( item ){
      return item.compared.length;
    } );
    var selected = items.shift();
    var opponent;

    if( 0 >= selected.compared.length ){
      opponent = items.shift();
    } else {
      opponent = _.find( items, function( item ){
        return 0 > item.compared.indexOf( selected._id );
      } );

      if( !opponent ){
        opponent = items.shift();
      }
    }

    return {
      result : [ selected, opponent ]
    };
  }
}

exports = module.exports = {
  select : select
};
