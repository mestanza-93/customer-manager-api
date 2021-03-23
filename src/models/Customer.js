const mongoose = require("mongoose");
const { composeWithMongoose } = require("graphql-compose-mongoose");
const Schema = mongoose.Schema;

let Customer = new Schema(
  {
    name: {
      type: String,
      index: true
    },
    lastname: {
      type: String,
      index: true
    },
    phone: {
      type: Number,
      index: true
    },
    phone2: {
      type: Number
    },
    dni: {
      type: String,
      index: true
    },
    postalcode: {
      type: Number,
      index: true
    },
    address: {
      type: String,
      index: true
    },
    town: {
      type: String,
      index: true
    },
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
      index: true
    },
  }
);

module.exports = {
  CustomerSchema: mongoose.model("Customer", Customer),
  CustomerTC: composeWithMongoose(mongoose.model("Customer", Customer)),
};
