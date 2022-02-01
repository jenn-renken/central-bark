const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Upload

  type User {
    _id: ID
    username: String
    email: String
    pets: [Pet]
  }

  type Pet {
    _id: ID
    petPersonality: String
    petPreference: String
    petBreed: String
    createdAt: String
    name: String
    userId: ID
    username: String
    filename: String
  }
  input savedPets {
    petPersonality: String
    petPreference: String
    petBreed: String
    name: String
    filename: String
}
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    profile: User
    users: [User]
    user(username: String!): User
    pets(userId: ID): [Pet]
    pet(_id: ID!): Pet
  }
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addPet( 
        petPersonality: String!,
        petPreference: String!,
        petBreed: String!,
        name: String!,
        filename: String): User
  removePet(_id: ID!): User
  singleUpload(file: Upload!): File!
  }
  `;

  module.exports = typeDefs;

  //for future add to type User 
  //  friendCount: Int
  //  friends: [User]

  //add to type Pet
  //commentCount: Int
  //comments: [Comment]

  //add to mutation
  //addReaction(thoughtId: ID!, reactionBody: String!): Thought
  //addFriend(friendId: ID!): User