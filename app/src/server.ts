import { renderToString } from "react-dom/server";
import Root from "./root.component";

export const getResponseHeaders = (_) => ({});

export const serverRender = async (props) => {
  const root = Root(props);
  return renderToString(root);
};
