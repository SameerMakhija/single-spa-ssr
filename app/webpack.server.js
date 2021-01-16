const EsmWebpackPlugin = require("@purtuga/esm-webpack-plugin");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const webpackMerge = require("webpack-merge");

module.exports = (argv, webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "ssr",
    projectName: "app",
    webpackConfigEnv,
    argv,
  });

  defaultConfig.plugins = defaultConfig.plugins.filter(
    (plugin) =>
      plugin.constructor.name !== "CleanWebpackPlugin" &&
      plugin.constructor.name !== "SystemJSPublicPathWebpackPlugin"
  );

  return webpackMerge.smart(defaultConfig, {
    target: "node",
    entry: "./src/server.ts",
    output: {
      library: "mf",
      libraryTarget: "var",
      filename: "server.mjs",
    },
    plugins: [new EsmWebpackPlugin({ moduleExternals: true })],
  });
};
