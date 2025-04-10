import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql';
import { UserType, PetType } from '../schemas/Schemas';
import User from '../db/models/User.js';
import Pet from '../db/models/Pet.js';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: () => User.find(), 
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve: (_, args) => User.findById(args.id), 
    },
    pets: {
      type: new GraphQLList(PetType),
      resolve: () => Pet.find(), 
    },
    pet: {
      type: PetType,
      args: { id: { type: GraphQLID } },
      resolve: (_, args) => Pet.findById(args.id), 
    },
  },
});

export default RootQuery;
