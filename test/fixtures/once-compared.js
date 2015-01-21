"use strict";

module.exports = [
  {
    _id      : "selected",
    compared : [ "skip" ]
  },
  {
    _id      : "skip",
    compared : [ "opponent", "selected" ]
  },
  {
    _id      : "opponent",
    compared : [ "skip", "undefined", "undefined" ]
  }
];
