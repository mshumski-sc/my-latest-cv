const express = require("express");
const mongoose = require("mongoose");
const schema = require("./schema");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
require("dotenv").config();
const url = `mongodb+srv://cv-user:${process.env.password}@cv-gen-cluster.v38xk.mongodb.net/cv-db?retryWrites=true&w=majority`;
const connect = mongoose.connect(url, { useNewUrlParser: true });
connect.then(
  (db) => {
    console.log("Connected correctly to server!");
  },
  (err) => {
    console.log(err);
  }
);
const server = new ApolloServer({
  typeDefs: schema.typeDefs,
  resolvers: schema.resolvers,
});
const app = express();
app.use(bodyParser.json());
app.use("*", cors());
server.applyMiddleware({ app });
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
