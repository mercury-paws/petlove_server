import { GraphQLSchema } from "graphql";

import RootQuery from "../resolvers/queries/queries";
import Mutation from "../resolvers/mutations/mutations";

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export default schema;