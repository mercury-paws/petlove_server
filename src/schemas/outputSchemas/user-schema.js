import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';


export const UserSchema = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    photo: { type: GraphQLString },
  }),
});

