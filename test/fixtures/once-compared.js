"use strict";

module.exports = [
  {
    _id         : "selected",
    compared    : [ "skip" ],
    comparedNum : 1
  },
  {
    _id         : "skip",
    compared    : [ "opponent", "selected" ],
    comparedNum : 2
  },
  {
    _id         : "opponent",
    compared    : [ "skip", "undefined", "undefined" ],
    comparedNum : 3
  }
];
