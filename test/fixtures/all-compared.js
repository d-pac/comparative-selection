"use strict";

module.exports = [
  {
    _id         : "skip",
    compared    : [ "opponent", "selected", "undefined", "undefined" ]
  },
  {
    _id         : "selected",
    compared    : [ "opponent", "skip" ]
  },
  {
    _id         : "opponent",
    compared    : [ "skip", "selected", "undefined" ]
  }
];
