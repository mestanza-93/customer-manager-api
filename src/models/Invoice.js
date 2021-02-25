const mongoose = require("mongoose");
const { composeWithMongoose } = require("graphql-compose-mongoose");
const Schema = mongoose.Schema;

let product = require("./Product");

let Invoice = new Schema(
  {
    idInvoice: {
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
  InvoiceSchema: mongoose.model("Invoice", Invoice),
  InvoiceTC: composeWithMongoose(mongoose.model("Invoice", Invoice)),
};
