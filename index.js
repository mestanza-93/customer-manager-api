const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const path = require("path");

const constants = require("./constants")

const logger = require(constants.CORE_PATH + "/logger");

const extensions = ({ context }) => {
  return {
    runTime: Date.now() - context.startTime,
  };
};

app.use(logger);

app.listen(constants.PORT, async () => {
  console.log(`Running in PORT: ${constants.PORT}`);
  await mongoose.connect(constants.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

const graphqlSchema = require(constants.SCHEMAS_PATH + "/index");

const setupGraphQLServer = () => {

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
    "/graphql",
    graphqlHTTP((request) => {
      return {
        context: { startTime: Date.now() },
        schema: graphqlSchema,
        extensions,
      };
    })
  );
  
  return app;
}

export default setupGraphQLServer;
