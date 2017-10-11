"use strict";

// `shuffle` creates a copy and uses a variation of the fisher-yates algorithm,
// see https://github.com/lodash/lodash/blob/master/shuffle.js
const { shuffle } = require( "lodash" );

/**
 * @typedef {Object} Item
 * @property {string} id - ID of the item
 * @property {string[]} compared - An array containing id's of the items this item has been compared with.
 * N.B. this _must_ contain duplicate ID's if the item has been compared multiple times with another item.
 */

/**
 * @typedef {Object} Comparison
 * @property {string} a - the ID of the "A" item
 * @property {string} b - the ID of the "B" item
 */

/**
 * Simple comparative selection algorithm
 *
 * @example
 * const selected = cs.select([
 *   {
 *     id         : "3",
 *     compared    : [ "2", "4" ]
 *   },
 *   {
 *     id         : "2",
 *     compared    : [ "3" ]
 *   },
 *   {
 *     id         : "1",
 *     compared    : []
 *   },
 *   {
 *     id         : "4",
 *     compared    : [ "3", "5", "6" ]
 *   }
 * ]);
 * console.log( selected );
 * // outputs:
 * // { a:"1", b:"2" }
 * @param {Item[]} items - An array of {@link Item}s
 * @returns {Comparison} - the pair of items to compare
 */
function select( items ){
  items = shuffle( items ).sort( ( a,
                                   b ) => a.compared.length - b.compared.length );
  /**
   * @private
   * @type {Item}
   */
  const selected = items.shift();
  /**
   * @private
   * @type {Item}
   */
  let opponent;

  if( selected.compared.length <= 0 ){
    opponent = items.shift();
  } else {
    opponent = items.find( ( item ) => item.compared.indexOf( selected.id ) < 0 );

    if( !opponent ){
      opponent = items.shift();
    }
  }

  return {
    a : selected.id,
    b : opponent.id
  };
}

module.exports = {
  select : select
};
