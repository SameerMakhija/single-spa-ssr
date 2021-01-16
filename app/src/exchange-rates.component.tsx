import { gql, useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

const Title = styled.h1`
  color: red;
`;

export default function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  return (
    <>
      <Title>Exchange Rates</Title>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error :(</p>
      ) : (
        data.rates.map(({ currency, rate }) => (
          <div key={currency}>
            <p>
              {currency}: {rate}
            </p>
          </div>
        ))
      )}
    </>
  );
}
