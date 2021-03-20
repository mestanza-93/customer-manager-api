const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const bodyParser = require("body-parser");
const cors = require('cors');

const constants = require("./constants")
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
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


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
        res.send(500).json(sanitizeErrors(result))
      } else {
        res.send(200).json(result)
      }
    }
    
  })
);

app.all(
  "/api",
  cors(),
  graphqlHTTP({
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
  })
);

app.listen(constants.PORT, async () => {
  await mongoose.connect(constants.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 2, // Maintain up to 'X' socket connections
    socketTimeoutMS: 10000, // Close sockets after 'X' miliseconds of inactivity
    serverSelectionTimeoutMS: 5000 // Keep trying to send operations for 'X' miliseconds
  });
});



/**
 * GraphQL handlers exports to functions
 */
exports.graphqlHandler = graphqlHTTP({
  context: { startTime: Date.now() },
  schema: graphqlSchema,
  extensions,
  writeResponse: (result, res) => {
    mongoose.disconnect();

    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
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
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
    mongoose.disconnect();
  
    if (result.errors) {
      res.send(500).json(sanitizeErrors(result))
    } else {
      res.send(200).json(result)
    }
  }
});