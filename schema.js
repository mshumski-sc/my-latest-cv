const { gql } = require("apollo-server-express");
const Movie = require("./models/movies").Movies;

const typeDefs = gql`
  type Movie {
    id: ID!
    name: String!
    producer: String!
    rating: Float!
  }
  type Query {
    getMovies: [Movie]
    getMovie(id: ID!): Movie
  }
  type Mutation {
    addMovie(name: String!, producer: String!, rating: Float!): Movie
    updateMovie(id: ID!, name: String!, producer: String!, rating: Float): Movie
    deleteMovie(id: ID!): Movie
  }
`;

const resolvers = {
  Query: {
    getMovies: (parent, args) => {
      console.log(parent);
      return Movie.find({});
    },
    getMovie: (parent, args) => {
      return Movie.findById(args.id);
    },
  },
  Mutation: {
    addMovie: (parent, args) => {
      console.log("in endpoint");
      console.log(typeof Movie);
      let movie = new Movie({
        name: args.name,
        producer: args.producer,
        rating: args.rating,
      });
      return movie.save();
    },
    updateMovie: (parent, args) => {
      if (!args.id) return;
      console.log("args in update", args);
      return Movie.findOneAndUpdate(
        {
          _id: args.id,
        },
        {
          $set: {
            name: args.name,
            producer: args.producer,
            rating: args.rating,
          },
        },
        { new: true },
        (err, Movie) => {
          if (err) {
            console.log("Something went wrong when updating the movie");
          } else {
          }
        }
      );
    },
    deleteMovie: (parent, args) => {
      if (!args.id) return;
      return Movie.findById(args.id).deleteOne();
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
