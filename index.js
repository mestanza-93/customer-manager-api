const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const bodyParser = require("body-parser");
const cors = require('cors');
const { ApolloServer } = require('apollo-server-cloud-functions');

const constants = require("./constants")
const extensions = ({ context }) => {
  return {
    runTime: Date.now() - context.startTime,
  };
};

const graphqlSchema = require(constants.SCHEMAS_PATH + "/index");


/**
 * Setup Express server
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
 * Setup Apollo Server
 */
const server = new ApolloServer({
  schema: graphqlSchema,
  context: ({ req, res }) => ({
    headers: req.headers,
    req,
    res,
  }),
});

/**
 * GraphQL handlers exports to functions
 */

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE']
  },
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