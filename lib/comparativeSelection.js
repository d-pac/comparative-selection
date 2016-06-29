"use strict";

const _ = require( "lodash" );
const spec = require( 'd-pac.plugins-spec' );
const util = require( 'util' );

const payloadValidator = spec.createValidator(
  spec.schemas.selectionpayload.name, {
    "selectionpayload" : {
      properties : {
        representations : {
          required : true
        },
        "minItems"      : 2
      }
    },
    "representation"   : {
      properties : {
        compared : {
          required : true
        }
      }
    }
  } );

/**
 * Simple comparative selection algorithm
 * @param {object} payload - see https://github.com/d-pac/d-pac.plugins-spec/blob/master/schemas/selectionpayload.json
 * @returns {[]} - An array containing the two representations that need to be compared
 */
function select( payload ){
  const payloadValidation = payloadValidator( payload );
  if( !payloadValidation.isValid ){
    throw new Error( 'Invalid `select` payload: ' + util.inspect( payloadValidation.errors ) );
  }
  const items = _.sortBy( _.shuffle( payload.representations ), ( item ) => item.compared.length);
  const selected = items.shift();
  let opponent;

  if( 0 >= selected.compared.length ){
    opponent = items.shift();
  } else {
    opponent = _.find( items, ( item )=> 0 > item.compared.indexOf( selected._id ) );

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
