const { VueLoaderPlugin } = require('vue-loader');

/**
 * @param {typeof import("@nativescript/webpack")} webpack
 */
module.exports = (webpack) => {
  webpack.useConfig('vue');

  webpack.chainWebpack((config) => {
    // resolve any imports from "vue" to "nativescript-vue"
    config.resolve.alias.set('vue', 'nativescript-vue');

    config.plugins.get('VueLoaderPlugin').use(VueLoaderPlugin);

    // use "vue-loader" from "nativescript-vue" deps rather than the one from @nativescript/webpack
    config.module.rules
      .get('vue')
      .uses.get('vue-loader')
      .loader(require.resolve('vue-loader'))
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

    config.module.rules
      .get('css')
      .uses.get('vue-css-loader')
      .loader(require.resolve('vue-loader/dist/stylePostLoader.js'));

    config.module.rules
      .get('scss')
      .uses.get('vue-css-loader')
      .loader(require.resolve('vue-loader/dist/stylePostLoader.js'));

    config.plugin('DefinePlugin').tap((args) => {
      Object.assign(args[0], {
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
      });

      return args;
    });

    // disable vue fork ts checker, as it doesn't work with vue3 yet?
    config.plugin('ForkTsCheckerWebpackPlugin').tap((args) => {
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
