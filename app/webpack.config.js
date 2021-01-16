const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "ssr",
    projectName: "app",
    webpackConfigEnv,
    argv,
  });

  defaultConfig.plugins = defaultConfig.plugins.filter(
    (plugin) => plugin.constructor.name !== "CleanWebpackPlugin"
  );

  return webpackMerge.smart(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
  });
};
