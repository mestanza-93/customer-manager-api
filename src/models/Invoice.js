const mongoose = require("mongoose");
const { composeWithMongoose } = require("graphql-compose-mongoose");
const Schema = mongoose.Schema;

let concept = require("./Concept");

let Invoice = new Schema(
  {
    invoice_id: {
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
    year: {
      type: Number
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
  InvoiceSchema: mongoose.model("Invoice", Invoice),
  InvoiceTC: composeWithMongoose(mongoose.model("Invoice", Invoice)),
};
