const mongoose = require("mongoose");
const { composeWithMongoose } = require("graphql-compose-mongoose");
const Schema = mongoose.Schema;

let product = require("./Product");

let Budget = new Schema(
  {
    idBudget: {
      type: Number,
    },
    idWork: {
      type: String,
    },
    iva: {
      type: Number,
    },
    date: {
      type: Date,
    },
    payment: {
      type: Number,
    },
    comment: {
      type: String,
    },
    timestamp: {
      type: String,
    },
    products: {
      type: Array,
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
