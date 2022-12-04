const { VueLoaderPlugin } = require("vue-loader");

/**
 * @param {typeof import("@nativescript/webpack")} webpack
 */
module.exports = (webpack) => {
  webpack.useConfig("vue");

  webpack.chainWebpack((config) => {
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
            // isCustomElement: (el) => el.toLowerCase() === 'label',
            // transformHoist: null
          },
        };
      });

    config.plugin("DefinePlugin").tap((args) => {
      Object.assign(args[0], {
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
      });

      return args;
    });

    // disable vue fork ts checker, as it doesn't work with vue3 yet?
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
