"use strict";

// `shuffle` creates a copy and uses a variation of the fisher-yates algorithm,
// see https://github.com/lodash/lodash/blob/master/shuffle.js
const {shuffle} = require("lodash");

/**
 * @private
 */
class ItemProxy {
  constructor(model) {
    this.id = model.id;
    this._model = model;
    this.pairedWith = [];
  }

  pairWith(other) {
    this.pairedWith.push(other.id);
  }

  hasBeenPairedWith(other) {
    return this.pairedWith.indexOf(other.id) > -1;
  }

}

/**
 * @private
 */
class Lookup {
  get size() {
    return this.list.length;
  }

  constructor() {
    this.list = [];
    this.map = {};
  }

  add(obj) {
    this.list.push(obj);
    this.map[obj.id] = obj;
  }

  getById(id) {
    return this.map[id];
  }

  sample() {
    return this.list[Math.floor(Math.random() * this.size)];
  }
}

/**
 * @typedef {Object} Item
 * @property {string} id - ID of the item
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
 const comparative = require('comparative-selection');

 const pair = comparative.select([{id:"1"}, {id:"2"}, {id:"3"}, {id:"4"}]);
 console.log('pair:', pair); // e.g.: {a: "2", b: "4"}
 * @example
 const comparative = require('comparative-selection');

 const pair = comparative.select([{id:"1"}, {id:"2"}, {id:"3"}, {id:"4"}], [{a:"2", b: "1"}]);
 console.log('pair:', pair); // {a: "3", b: "4"}
 * @param {Object} payload - Payload object containing the relevant values
 * @param {Item[]} payload.items - An array of {@link Item}s
 * @param {Comparison[]} [payload.comparisons] - An array of {@link Comparison}s
 * @returns {Comparison} - the pair of item ID's to compare
 */
function select(payload) {

  const proxies = new Lookup();
  payload.items.forEach((item) => proxies.add(new ItemProxy(item)));

  const comparisons = payload.comparisons || [];
  comparisons.forEach((c) => {
    const a = proxies.getById(c.a);
    const b = proxies.getById(c.b);
    a.pairWith(b);
    b.pairWith(a);
  });

  const proxyList = shuffle(proxies.list)
    .sort((a, b) => a.pairedWith.length - b.pairedWith.length);

  /**
   * @private
   * @type {ItemProxy}
   */
  const selected = proxyList.shift();
  /**
   * @private
   * @type {ItemProxy}
   */
  let opponent;

  if (selected.pairedWith.length <= 0) {
    opponent = proxyList.shift();
  } else {
    opponent = proxyList.find((needle) => !needle.hasBeenPairedWith(selected.id));

    if (!opponent) {
      opponent = proxyList.shift();
    }
  }

  return {
    a: selected.id,
    b: opponent.id
  };
}

module.exports = {
  select: select
};
