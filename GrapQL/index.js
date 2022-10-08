import { GraphQLClient } from 'graphql-request';

import enviroment from '../enviroment';

export const getClient = async () => {
  let headers = {};

  const graphQLClient = new GraphQLClient(enviroment.GRAPHQL_ENDPOINT, {
    headers
  });

  return graphQLClient;
};