import userMutations from "./user-mutations";
import petMutations from "./pet-mutations";
import { GraphQLObjectType } from 'graphql';

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        ...petMutations.getFields(),
        ...userMutations.getFields(),
    }
});

export default Mutation;