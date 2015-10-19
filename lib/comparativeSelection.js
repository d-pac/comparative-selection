"use strict";

var _ = require( "lodash" );
var spec = require( 'd-pac.plugins-spec' );
var util = require( 'util' );

var payloadSchema = {
  "$schema"    : "http://json-schema.org/draft-04/schema#",
  "title"      : "Select payload",
  "type"       : "object",
  "properties" : {
    "representations" : {
      "$ref"     : "representationsList",
      "required" : true
    }
  },
  "required"   : true
};

/**
 * Simple comparative selection algorithm
 */
function select( payload ){
  var validator = spec.createValidator( payloadSchema, {
    schemas : {
      representationsList : spec.schemas.representationsList
    }
  } );
  var payloadValidation = validator(payload);
  if( !payloadValidation.isValid ){
    throw new Error( 'Invalid `select` payload: ' + util.inspect( payloadValidation.errors ) );
  }
  var items = _.sortBy( _.shuffle( payload.representations ), function( item ){
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

module.exports = {
  select : select
};
