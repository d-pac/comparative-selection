"use strict";

module.exports = {
  items: [
    {
      id: "selected",
    },
    {
      id: "skip1",
    },
    {
      id: "opponent",
    },
    {
      id: "skip2",
    }
  ],
  comparisons: [
    {a:"selected", b: "skip1"},
    {a: "skip1", b: "skip2"},
    {a: "skip2", b: "skip1"},
    {a: "skip2", b: "opponent"},
    {a: "skip2", b: "opponent"}
  ]
};
