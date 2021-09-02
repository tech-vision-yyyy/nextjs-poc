import { GraphQLClient } from "graphql-request";

const graphcms = new GraphQLClient(
  "https://api-us-east-1.graphcms.com/v2/ckst92y9u5i6j01y239lj7qbn/master",
  {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  }
);

export default graphcms;
