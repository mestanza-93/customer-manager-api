const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const path = require("path");

const constants = require("./constants")

// const userFunctions = require(path.join(constants.MODELS_PATH, "user"));
const logger = require(constants.CORE_PATH + "/logger");

const extensions = ({ context }) => {
  return {
    runTime: Date.now() - context.startTime,
  };
};

app.use(logger);

app.listen(constants.PORT, async () => {
  console.log("Running in PORT: {{constants.PORT}}");
  await mongoose.connect(constants.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// mongoose.connection.on(
//   "error",
//   console.error.bind(console, "MongoDB connection error:")
// );

const graphqlSchema = require(constants.SCHEMAS_PATH + "/index");

app.use(
  "/graphql",
  graphqlHTTP((request) => {
    return {
      context: { startTime: Date.now() },
      graphiql: true,
      schema: graphqlSchema,
      extensions,
    };
  })
);

// exports.createUserTest = (request, response) => {

//   userFunctions.createUserTest(request, response);

// };

// exports.getAllUsers = (request, response) => {

//   userFunctions.getAllUsers(request, response);

// };
