const webpack = require("@nativescript/webpack");
const { VueLoaderPlugin } = require("vue-loader");

const path = require("path");

const compilerPath = path.resolve(__dirname, "../dist/compiler.cjs");
const nsVuePath = path.resolve(__dirname, "../src/index.ts");

module.exports = (env) => {
  webpack.init(env);
  webpack.useConfig("vue");

  webpack.chainWebpack((config) => {
    config.resolve.alias.set("vue", nsVuePath);
    config.plugin("VueLoaderPlugin").use(VueLoaderPlugin);

    config.module
      .rule("vue")
      .test(/\.vue$/)
      .use("vue-loader")
      .loader(require.resolve("vue-loader"))
      .tap((options) => {
        return {
          ...options,
          isServerBuild: false,
          compilerOptions: {
            isCustomElement: () => true
          }
          // compiler: compilerPath,
        };
      });

    config.plugin("DefinePlugin").tap((args) => {
      Object.assign(args[0], {
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
      });

      return args;
    });

    config.plugin("ForkTsCheckerWebpackPlugin").tap((args) => {
      args[0] = webpack.merge(args[0], {
        typescript: {
          extensions: {
            vue: {
              enabled: false,
              // compiler: compilerPath,
            },
          },
        },
      });
      return args;
    });
  });

  // Learn how to customize:
  // https://docs.nativescript.org/webpack

  return webpack.resolveConfig();
};
