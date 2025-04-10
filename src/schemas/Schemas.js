import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';


export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

export const PetType = new GraphQLObjectType({
  name: 'Pet',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    species: { type: GraphQLString },
    ownerId: { type: GraphQLID },
  }),
});
