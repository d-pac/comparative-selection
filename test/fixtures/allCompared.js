"use strict";

module.exports = {
  items: [
    {
      id: "skip1",
    },
    {
      id: "opponent"
    },
    {
      id: "selected",
    },
    {
      id: "skip2",
    }
  ],
  comparisons: [
    {a: "skip1", b: "selected"},
    {a: "selected", b: "skip2"},
    {a: "skip2", b: "skip1"},
    {a: "opponent", b: "skip2"},
    {a: "skip1", b: "opponent"},
    {a: "skip1", b: "opponent"},
    {a: "skip1", b: "opponent"},
    {a: "skip1", b: "opponent"}
  ]
};
