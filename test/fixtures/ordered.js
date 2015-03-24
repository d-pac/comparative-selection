"use strict";

module.exports = [
  {
    _id         : "selected",
    compared    : [],
    comparedNum : 0
  },
  {
    _id         : "opponent",
    compared    : [ "skip" ],
    comparedNum : 1
  },
  {
    _id         : "skip",
    compared    : [ "opponent", "undefined" ],
    comparedNum : 2
  }
];
