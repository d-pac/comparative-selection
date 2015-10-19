"use strict";

var _ = require( "lodash" );
var spec = require( 'd-pac.plugins-spec' );
var util = require( 'util' );

/**
 * Simple comparative selection algorithm
 */
function select( payload ){
  if(!spec.isSelectPayload(payload)){
    throw new Error('Incorrect `select` payload');
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
