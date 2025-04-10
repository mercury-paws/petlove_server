import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql';
import { UserType, PetType } from '../schemas/Schemas';
import User from '../db/models/User.js';
import Pet from '../db/models/Pet.js';

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve: (_, args) => User.create(args), // Create a new user
    },
    addPet: {
      type: PetType,
      args: {
        name: { type: GraphQLString },
        species: { type: GraphQLString },
        ownerId: { type: GraphQLID },
      },
      resolve: (_, args) => Pet.create(args), // Create a new pet
    },
  },
});

export default Mutation;
