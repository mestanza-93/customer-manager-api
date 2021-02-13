const mongoose = require("mongoose");
const { composeWithMongoose } = require("graphql-compose-mongoose");

const Schema = mongoose.Schema;

let User = new Schema(
  {
    name: {
      type: String,
    },
    lastname: {
      type: String,
    },
    address: {
      type: String,
    },
    town: {
      type: String,
    },
    province: {
      type: String,
    },
    country: {
      type: String,
    },
    postalcode: {
      type: String,
    },
    dni: {
      type: String,
    },
    phone: {
      type: Number,
    },
    email: {
      type: String,
    },
    iban: {
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
  UserSchema: mongoose.model("User", User),
  UserTC: composeWithMongoose(mongoose.model("User", User)),
};
