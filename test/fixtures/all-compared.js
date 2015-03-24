"use strict";

module.exports = [
  {
    _id         : "skip",
    compared    : [ "opponent", "selected", "undefined", "undefined" ],
    comparedNum : 4
  },
  {
    _id         : "selected",
    compared    : [ "opponent", "skip" ],
    comparedNum : 2
  },
  {
    _id         : "opponent",
    compared    : [ "skip", "selected", "undefined" ],
    comparedNum : 3
  }
];
