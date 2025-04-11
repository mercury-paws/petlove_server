import { GraphQLObjectType, GraphQLID, GraphQLList } from 'graphql';
import { getAllUsers, getUserById } from '../../services/user-services.js';
import { UserSchema } from '../../schemas/outputSchemas/user-schema.js';


const UserRootQuery = new GraphQLObjectType({
  name: 'UserRootQuery',
  fields: {
    users: {
      type: new GraphQLList(UserSchema),
      resolve: () => getAllUsers(), 
    },
    user: {
      type: UserSchema,
      args: { id: { type: GraphQLID } },
      resolve: (_, args) => getUserById(args.id), 
    },
    
  },
});

export default UserRootQuery;
