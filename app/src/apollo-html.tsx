import { NormalizedCacheObject } from "@apollo/client";
import React from "react";

type Props = {
  content: string;
  state: NormalizedCacheObject;
};

export default function ApolloHtml({ content, state }: Props) {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(
            /</g,
            "\\u003c"
          )};`,
        }}
      />
    </>
  );
}
