import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import React from "react";
import ExchangeRates from "./exchange-rates.component";

declare global {
  interface Window {
    ssrApolloClient: ApolloClient<NormalizedCacheObject>;
  }
}

type Props = {
  apolloClient?: ApolloClient<NormalizedCacheObject>;
  name: string;
};

export default function Root({ apolloClient, name }: Props) {
  return (
    <ApolloProvider client={apolloClient || window.ssrApolloClient}>
      <ExchangeRates />
    </ApolloProvider>
  );
}
