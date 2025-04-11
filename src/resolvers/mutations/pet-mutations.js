import { GraphQLObjectType, GraphQLString } from 'graphql';
import { PetSchema } from '../../schemas/outputSchemas/user-schema.js';
import { PetInputTypes } from '../../schemas/inputTypes/pet-input-types.js';
import { createPet, deletePet, updatePet } from '../../services/pet-services.js';
import { cleanInputData } from '../../utils/cleanInputData.js';

const petMutations = new GraphQLObjectType({
  name: 'petMutations',
  fields: {
    addPet: {
      type: PetSchema,
      args: {
         input: { type: PetInputTypes }  
      },
      resolve: (_, args) => createPet(args.input),
    },
    updatePet: {
      type: PetSchema,
      args: {
        id: { type: GraphQLString },
        input: { type: PetInputTypes }
      },
      resolve: (_, { id, input }) => {
        const cleanedData = cleanInputData(input);
        return updatePet({id}, cleanedData);
      }    
    },
    deletePet: {
      type: PetSchema,
      args: {
        id: { type: GraphQLString },
      },
      resolve: async (_, { id }) => {
        let deletedCount = await deletePet(id);
       
          return deletedCount > 0;
       
      }
    },
  },
});

export default petMutations;
