"use strict";

const _ = require( "lodash" );
const util = require( 'util' );

/**
 * Simple comparative selection algorithm
 * @param {object} payload - see https://github.com/d-pac/d-pac.plugins-spec/blob/master/schemas/selectionpayload.json
 * @returns {{}} - An object with either a `result` field containing an Array with 2 selected representations,
 * or a `messages` field containing an Array with messages
 */
function select( payload ){
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
