import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { getDataFromTree } from "@apollo/client/react/ssr";
import fetch from "node-fetch";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import ApolloHtml from "./apollo-html";
import Root from "./root.component";

export const getResponseHeaders = (_) => ({});

export const serverRender = async (props) => {
  const apolloClient = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      fetch,
      uri: "https://48p1r2roz4.sse.codesandbox.io",
    }),
    cache: new InMemoryCache(),
  });

  const root = Root({ ...props, apolloClient });

  await getDataFromTree(root);
  const apolloState = apolloClient.extract();

  const styleSheet = new ServerStyleSheet();

  let assets;
  let content;
  try {
    const styledRoot = styleSheet.collectStyles(root);
    const styledHTML = renderToString(styledRoot);

    const styledApolloRoot = ApolloHtml({
      content: styledHTML,
      state: apolloState,
    });

    content = renderToString(styledApolloRoot);

    assets = styleSheet.getStyleTags();
  } catch (error) {
    styleSheet.seal();
    throw error;
  }
  styleSheet.seal();

  return { assets, content };
};
