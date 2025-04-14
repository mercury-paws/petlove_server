import { GraphQLString } from 'graphql';
import { UserSchema } from '../../schemas/outputSchemas/user-schema.js';
import User from '../../db/models/User.js';
import { deleteUser, updateUser } from '../../services/user-services.js';
import { UserInputTypes } from '../../schemas/inputTypes/user-input-types.js';
import { cleanInputData } from '../../utils/cleanInputData.js';

const userMutations = {
  addUser: {
    type: UserSchema,
    args: {
      input: { type: UserInputTypes }
    },
    resolve: (_, args) => User.create(args),
  },
  updateUser: {
    type: UserSchema,
    args: {
      id: { type: GraphQLString },
      input: { type: UserInputTypes },
    },

    resolve: (_, { id, input }) => {
      const cleanedData = cleanInputData(input);
      return updateUser({ id }, cleanedData);
    }
  },
  deleteUser: {
    type: UserSchema,
    args: {
      id: { type: GraphQLString },
    },
    resolve: async (_, { id }) => {
      let deletedCount = await deleteUser(id);
      return deletedCount > 0;
    }
  },
};

export default userMutations;
