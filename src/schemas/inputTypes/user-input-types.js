import { GraphQLInputObjectType, GraphQLString, GraphQLID } from 'graphql';


export const UserInputTypes = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    photo: { type: GraphQLString },
  },
});