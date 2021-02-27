const mongoose = require("mongoose");
const { composeWithMongoose } = require("graphql-compose-mongoose");
const Schema = mongoose.Schema;

let Concept = new Schema({
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
  Schema: Concept,
  ConceptSchema: mongoose.model("Concept", Concept),
  ConceptTC: composeWithMongoose(mongoose.model("Concept", Concept)),
};
