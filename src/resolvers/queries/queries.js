import { GraphQLObjectType } from 'graphql';
import PetRootQuery from "./pet-queries.js";
import UserRootQuery from "./user-queries.js";

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        ...PetRootQuery,
        ...UserRootQuery,
    }
});

export default RootQuery;