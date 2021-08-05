const mongoose = require("mongoose");
var uuid = require('uuid');
const { composeWithMongoose } = require("graphql-compose-mongoose");
const Schema = mongoose.Schema;

let concept = require("./Concept");

let Budget = new Schema(
  {
    _id: {
      type: String,
      index: { unique: true },
      default: uuid.v4
    },
    budget_id: {
      type: Number,
      index: true
    },
    work_id: {
      type: String,
      index: true
    },
    iva: {
      type: Number
    },
    date: {
      type: Date,
      default: Date.now,
      index: true
    },
    year: {
      type: Number,
      index: true
    },
    payment: {
      type: Number,
      index: true
    },
    comment: {
      type: String
    },
    timestamp: {
      type: String
    },
    concepts: {
      type: [concept.Schema],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

module.exports = {
  BudgetSchema: mongoose.model("Budget", Budget),
  BudgetTC: composeWithMongoose(mongoose.model("Budget", Budget)),
};
