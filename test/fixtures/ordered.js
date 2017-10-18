"use strict";

module.exports = {
  items: [
    {id: "selected"},
    {id: "opponent"},
    {id: "skip1"},
    {id: "skip2"},
  ],
  comparisons: [
    {a: "opponent", b: "skip1"},
    {a: "skip1", b: "skip2"},
    {a: "skip1", b: "skip2"},
  ]
};
