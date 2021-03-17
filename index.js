const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const bodyParser = require("body-parser");
const cors = require('cors');

const constants = require("./constants")

const logger = require(constants.CORE_PATH + "/logger");

const extensions = ({ context }) => {
  return {
    runTime: Date.now() - context.startTime,
  };
};

const graphqlSchema = require(constants.SCHEMAS_PATH + "/index");


/**
 * Setup server
 */
const app = express();
app.use(logger);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(constants.PORT, async () => {
  console.log(`Running in PORT: ${constants.PORT}`);
  await mongoose.connect(constants.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

/**
 * Routes
 */
app.use(
  "/graphiql",
  graphqlHTTP((request) => {
    return {
      context: { startTime: Date.now() },
      graphiql: true,
      schema: graphqlSchema,
      extensions,
    };
  })
);

app.use(
  "/api",
  graphqlHTTP((request) => {
    return {
      context: { startTime: Date.now() },
      schema: graphqlSchema,
      extensions,
    };
  })
);


/**
 * GraphQL handlers exports to functions
 */
exports.graphqlHandler = graphqlHTTP((request) => {
  return {
    context: { startTime: Date.now() },
    schema: graphqlSchema,
    extensions,
  };
});

exports.graphiqlHandler = graphqlHTTP((request) => {
  return {
    context: { startTime: Date.now() },
    graphiql: true,
    schema: graphqlSchema,
    extensions,
  };
});