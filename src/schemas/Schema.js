import { GraphQLSchema } from "graphql";

import RootQuery from "../resolvers/queries";
import Mutation from "../resolvers/mutations";

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export default schema;