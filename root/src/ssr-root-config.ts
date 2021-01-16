import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client/core";
import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";

declare global {
  interface Window {
    __APOLLO_STATE__: NormalizedCacheObject;
    ssrApolloClient?: ApolloClient<NormalizedCacheObject>;
  }
}

window.ssrApolloClient = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io",
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

const routes = constructRoutes(
  document.querySelector("#single-spa-layout") as HTMLTemplateElement
);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();
