import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "cross-fetch";

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: "/.netlify/functions/graphql-fauna",
    fetch,
  }),
  cache,
});
