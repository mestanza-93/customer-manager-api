const mongoose = require("mongoose");
const { composeWithMongoose } = require("graphql-compose-mongoose");
const Schema = mongoose.Schema;

let product = require("./Product");

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
    products: {
      type: [product.Schema],
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
