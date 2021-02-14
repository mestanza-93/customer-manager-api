const mongoose = require("mongoose");
const { composeWithMongoose } = require("graphql-compose-mongoose");
const Schema = mongoose.Schema;

let Customer = new Schema(
  {
    name: {
      type: String,
    },
    lastmame: {
      type: String,
    },
    phone: {
      type: Number,
    },
    phone2: {
      type: Number,
    },
    dni: {
      type: String,
    },
    postalcode: {
      type: Number,
    },
    address: {
      type: String,
    },
    town: {
      type: String,
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
  CustomerSchema: mongoose.model("Customer", Customer),
  CustomerTC: composeWithMongoose(mongoose.model("Customer", Customer)),
};
