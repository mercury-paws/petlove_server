import { GraphQLInputObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean } from 'graphql';

export const PetInputTypes = new GraphQLInputObjectType({
  name: 'PetInput',
  fields: {
    name: { type: GraphQLString },
    title: { type: GraphQLString },
    category: { type: GraphQLString },
    sex: { type: GraphQLString },
    species: { type: GraphQLString },
    about: { type: GraphQLString },
    birthday: { type: GraphQLString },
    starNumber: { type: GraphQLInt },
    price: { type: GraphQLInt },
    isFavourite: { type: GraphQLBoolean },
    photo: { type: GraphQLString },
    userId: { type: GraphQLID }
  },
});