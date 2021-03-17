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
  await mongoose.connect(constants.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 2, // Maintain up to 'X' socket connections
    socketTimeoutMS: 10000, // Close sockets after 'X' seconds of inactivity
    serverSelectionTimeoutMS: 5000 // Keep trying to send operations for 'X' seconds
  });
});

/**
 * Routes
 */
app.use(
  "/graphiql",
  graphqlHTTP({
    context: { startTime: Date.now() },
    graphiql: true,
    schema: graphqlSchema,
    extensions,
    writeResponse: (result, res) => {
      mongoose.disconnect();

      if (result.errors) {
        logger.error("Error executing query: " + query + "\nVariables:\n" + JSON.stringify(variables) + "\nErrors:\n" + JSON.stringify(result))
        res.send(500).json(sanitizeErrors(result))
      } else {
        res.send(200).json(result)
      }
    }
    
  })
);

app.use(
  "/api",
  graphqlHTTP({
    context: { startTime: Date.now() },
    schema: graphqlSchema,
    extensions,
    writeResponse: (result, res) => {
      mongoose.disconnect();

      if (result.errors) {
        logger.error("Error executing query: " + query + "\nVariables:\n" + JSON.stringify(variables) + "\nErrors:\n" + JSON.stringify(result))
        res.send(500).json(sanitizeErrors(result))
      } else {
        res.send(200).json(result)
      }
    }
  })
);


/**
 * GraphQL handlers exports to functions
 */
exports.graphqlHandler = graphqlHTTP({
  context: { startTime: Date.now() },
  schema: graphqlSchema,
  extensions,
  writeResponse: (result, res) => {
    mongoose.disconnect();

    if (result.errors) {
      res.send(500).json(sanitizeErrors(result))
    } else {
      res.send(200).json(result)
    }
  }
});

exports.graphiqlHandler = graphqlHTTP({
  context: { startTime: Date.now() },
  graphiql: true,
  schema: graphqlSchema,
  extensions,
  writeResponse: (result, res) => {
    mongoose.disconnect();

    if (result.errors) {
      res.send(500).json(sanitizeErrors(result))
    } else {
      res.send(200).json(result)
    }
  }
});

/**
 * Close all Mongo connections opened
 */
mongoose.disconnect();