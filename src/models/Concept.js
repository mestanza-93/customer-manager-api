const mongoose = require("mongoose");
var uuid = require('uuid');
const { composeWithMongoose } = require("graphql-compose-mongoose");
const Schema = mongoose.Schema;

let Concept = new Schema(
  {
    _id: {
      type: String,
      index: { unique: true },
      default: uuid.v4
    },
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
  },
);

module.exports = {
  Schema: Concept,
  ConceptSchema: mongoose.model("Concept", Concept),
  ConceptTC: composeWithMongoose(mongoose.model("Concept", Concept)),
};
