import { GraphQLObjectType } from 'graphql';
import PetRootQuery from "./pet-queries";
import UserRootQuery from "./user-queries";

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        ...PetRootQuery.getFields(),
        ...UserRootQuery.getFields(),
    }
});

export default RootQuery;