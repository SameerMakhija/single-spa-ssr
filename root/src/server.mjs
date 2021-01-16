import path from "path";

import express from "express";
import {
  constructServerLayout,
  sendLayoutHTTPResponse,
} from "single-spa-layout/server";

const appMap = {
  "@ssr/app": "../../app/dist/server.mjs",
};

const serverLayout = constructServerLayout({ filePath: "src/index.html" });

const server = express();

server.use(express.static("dist", { extensions: ["js", "js.map"] }));

server.get("*", (req, res) => {
  sendLayoutHTTPResponse({
    res,
    serverLayout,
    urlPath: req.path,
    async renderApplication({ appName, propsPromise }) {
      const [app, props] = await Promise.all([
        import(appMap[appName]),
        propsPromise,
      ]);
      return app.serverRender(props);
    },
    async retrieveApplicationHeaders({ appName, propsPromise }) {
      const [app, props] = await Promise.all([
        import(appMap[appName]),
        propsPromise,
      ]);
      return app.getResponseHeaders(props);
    },
    async retrieveProp(propName) {},
    assembleFinalHeaders(apps) {
      return apps.reduce(
        (headers, app) => ({ ...headers, ...app.appHeaders }),
        {}
      );
    },
  });
});

server.listen(9000);
