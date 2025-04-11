import { GraphQLObjectType, GraphQLID, GraphQLList } from 'graphql';
import { PetSchema } from '../../schemas/outputSchemas/pet-schema.js';
import { getAllPets, getPetById } from '../../services/pet-services.js';


const PetRootQuery = new GraphQLObjectType({
  name: 'PetRootQuery',
  fields: {
    pets: {
      type: new GraphQLList(PetSchema),
      resolve: () => getAllPets(), 
    },
    pet: {
      type: PetSchema,
      args: { id: { type: GraphQLID } },
      resolve: (_, args) => getPetById(args.id), 
    },
  },
});

export default PetRootQuery;
