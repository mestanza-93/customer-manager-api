const mongoose = require("mongoose");
const { composeWithMongoose } = require("graphql-compose-mongoose");
const Schema = mongoose.Schema;

let Product = new Schema({
  concept: {
    type: String,
  },
  base: {
    type: Number
  },
  units: {
    type: Number
  },
  official: {
    type: Boolean
  },
  relation_id: {
    type: String
  }
});

module.exports = {
  Schema: Product,
  ProductSchema: mongoose.model("Product", Product),
  ProductTC: composeWithMongoose(mongoose.model("Product", Product)),
};
