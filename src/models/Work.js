const mongoose = require("mongoose");
const { composeWithMongoose } = require("graphql-compose-mongoose");
const Schema = mongoose.Schema;

let Work = new Schema(
  {
    name: {
      type: String
    },
    customer_id: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    },
    timestamp: {
      type: String
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
  WorkSchema: mongoose.model("Work", Work),
  WorkTC: composeWithMongoose(mongoose.model("Work", Work)),
};
