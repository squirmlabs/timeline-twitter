// Dependencies
import express from 'express';
import expressGraphQL from 'express-graphql';
import cors from 'cors';
import graphQLExpress from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';

// Query
import { typeDefs } from './types/query';
import { resolvers } from './types/resolvers';

// Define Port
const env = {
  PORT: 7000
};

// Defining our schema with our typeDefs and resolvers
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Initalizing our express app
const app = express();

// Using cors
app.use(cors());

// GraphQL Middleware
app.use(
  '/graphiql',
  graphQLExpress({
    schema,
    pretty: true,
    graphiql: true
  })
);

// Listening port 7000
app.listen(env.PORT);

console.log(`Server started on port ${env.PORT}`);
