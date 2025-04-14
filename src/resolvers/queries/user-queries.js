import { GraphQLObjectType, GraphQLID, GraphQLList,GraphQLString } from 'graphql';
import { getAllUsers, getUserById } from '../../services/user-services.js';
import { UserSchema } from '../../schemas/outputSchemas/user-schema.js';


const UserRootQuery = {
  users: {
    type: new GraphQLList(UserSchema),
    args: {
      species: { type: GraphQLString }
    },
    resolve: () => getAllUsers(),
  },
  user: {
    type: UserSchema,
    args: { id: { type: GraphQLID } },
    resolve: (_, args) => getUserById(args.id),
  },
    
};


export default UserRootQuery;
