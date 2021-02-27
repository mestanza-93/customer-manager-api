const mongoose = require("mongoose");
const { composeWithMongoose } = require("graphql-compose-mongoose");
const Schema = mongoose.Schema;

let concept = require("./Concept");

let Budget = new Schema(
  {
    budget_id: {
      type: Number
    },
    work_id: {
      type: String
    },
    iva: {
      type: Number
    },
    date: {
      type: Date,
      default: Date.now
    },
    payment: {
      type: Number
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
  }
);

module.exports = {
  BudgetSchema: mongoose.model("Budget", Budget),
  BudgetTC: composeWithMongoose(mongoose.model("Budget", Budget)),
};
