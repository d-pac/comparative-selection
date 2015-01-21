"use strict";

module.exports = [
  {
    _id      : "selected",
    compared : []
  },
  {
    _id      : "opponent",
    compared : [ "skip" ]
  },
  {
    _id      : "skip",
    compared : [ "opponent", "undefined" ]
  }
];
