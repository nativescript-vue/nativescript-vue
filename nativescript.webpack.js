const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

/**
 * @param {typeof import("@nativescript/webpack")} webpack
 */
module.exports = (webpack) => {
  webpack.useConfig("vue");

  const projectRoot = webpack.Utils.project.getProjectRootPath();

  webpack.chainWebpack(config => {
    // try to resolve loaders from the project node_modules before others
    config.resolveLoader.modules
      .prepend(path.resolve(projectRoot, "node_modules"));

    config.module.rules
      .get("css")
      .uses.get("vue-css-loader")
      .loader("vue-loader/dist/stylePostLoader.js");

    config.module.rules
      .get("scss")
      .uses.get("vue-css-loader")
      .loader("vue-loader/dist/stylePostLoader.js");

    config.module.rules
      .get("vue")
      .uses.get("vue-loader")
      .tap(options => ({ ...options, isServerBuild: false }));

    config.plugins.get("VueLoaderPlugin").use(VueLoaderPlugin);

    config.plugin("DefinePlugin").tap((args) => {
      Object.assign(args[0], {
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
      });

      return args;
    });

    // disable vue fork ts checker, as it doesn"t work with vue3 yet?
    config.plugin("ForkTsCheckerWebpackPlugin").tap((args) => {
      args[0] = webpack.merge(args[0], {
        typescript: {
          extensions: {
            vue: {
              enabled: false,
            },
          },
        },
      });

      return args;
    });
  });
};
