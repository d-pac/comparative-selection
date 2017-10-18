"use strict";

module.exports = {
  items: [
    {
      id: "skip1",
    },
    {
      id: "skip2"
    },
    {
      id: "selected",
    },
    {
      id: "opponent",
    }
  ],
  comparisons: [
    {a: "skip1", b: "selected"},
    {a: "selected", b: "opponent"},
    {a: "opponent", b: "skip1"},
    {a: "skip2", b: "opponent"},
    {a: "skip1", b: "skip2"},
    {a: "skip1", b: "skip2"},
    {a: "skip1", b: "skip2"},
    {a: "skip1", b: "skip2"}
  ]
};
