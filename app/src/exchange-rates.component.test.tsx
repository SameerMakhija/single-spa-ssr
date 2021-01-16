import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { render } from "@testing-library/react";
import ExchangeRates from "./exchange-rates.component";

describe("ExchangeRates component", () => {
  it("should be in the document", () => {
    const { getByText } = render(
      <MockedProvider>
        <ExchangeRates />
      </MockedProvider>
    );
    expect(getByText("Exchange Rates")).toBeInTheDocument();
  });
});
