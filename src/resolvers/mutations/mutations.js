import userMutations from "./user-mutations.js";
import petMutations from "./pet-mutations.js";
import { GraphQLObjectType } from 'graphql';

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        ...petMutations,
        ...userMutations,
    }
});

export default Mutation;