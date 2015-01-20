"use strict";

var _ = require( "lodash" );

/**
 * Simple comparative selection algorithm, based on [NoMoreMarking's `cj` module](https://github.com/NoMoreMarking/cj)
 * @param items
 */

module.exports = function select( items ){
  if( !items || 0 > items.length ){
    return [];
  } else {
    items = _.sortBy( _.shuffle( items ), function( item ){
      return item.comparedNum;
    } );
    var selected = items.shift();
    var opponent;

    if( 0 >= selected.comparedNum ){
      opponent = items.shift();
    } else {
      opponent = _.find( items, function( item ){
        return 0 > item.compared.indexOf( selected._id );
      } );

      if( !opponent ){
        opponent = items.shift();
      }
    }

    return [ selected, opponent ];
  }
};
