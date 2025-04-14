import { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLString } from 'graphql';
import { PetSchema } from '../../schemas/outputSchemas/pet-schema.js';
import { getAllPets, getPetById } from '../../services/pet-services.js';


const PetRootQuery = {
  pets: {
    type: new GraphQLList(PetSchema),
    args: {
      species: { type: GraphQLString }
    },
    resolve: async () => {
      try {
        const pets = await getAllPets(); // Ensure the service is correctly returning an array
        return pets;
      } catch (error) {
        throw new Error("Error fetching pets: " + error.message);
      }
    },
  },
  pet: {
    type: PetSchema,
    args: { id: { type: GraphQLID } },
    resolve: (_, args) => getPetById(args.id),
  },
};

export default PetRootQuery;
