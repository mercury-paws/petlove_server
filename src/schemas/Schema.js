import { GraphQLSchema } from "graphql";

import RootQuery from "../resolvers/queries/queries.js";
import Mutation from "../resolvers/mutations/mutations.js";

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export default schema;