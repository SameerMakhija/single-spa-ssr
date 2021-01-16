import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import Root from "./root.component";

export const getResponseHeaders = (_) => ({});

export const serverRender = async (props) => {
  const root = Root(props);

  const sheet = new ServerStyleSheet();

  let assets;
  let content;
  try {
    const styledRoot = sheet.collectStyles(root);
    content = renderToString(styledRoot);

    assets = sheet.getStyleTags();
  } catch (error) {
    sheet.seal();
    throw error;
  }
  sheet.seal();

  return { assets, content };
};
