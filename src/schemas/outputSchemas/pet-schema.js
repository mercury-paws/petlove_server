import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean } from 'graphql';
import { UserSchema } from './user-schema.js';

export const PetSchema = new GraphQLObjectType({
  name: 'Pet',
  fields: () => ({
    id: { type: GraphQLID },
    title: {type: GraphQLString},
    name: { type: GraphQLString },
    category: {
      type: GraphQLString,
     },
    sex: {
      type: GraphQLString,
    },
    species: {
      type: GraphQLString,
     },
    about: { type: GraphQLString },
    birthday: {
      type: GraphQLString,
      resolve: (pet) => pet.birthday ? pet.birthday.toISOString() : null
    },
    starNumber: { type: GraphQLInt },
    price: { type: GraphQLInt },
    isFavourite: { type: GraphQLBoolean },
    photo: { type: GraphQLString },
    userId: { type: GraphQLID },
    user: { type: UserSchema }
  }),
});
