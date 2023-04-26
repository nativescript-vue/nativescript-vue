const path = require('path');
const webpack = require('@nativescript/webpack');

module.exports = (env) => {
  webpack.init(env);

  // Learn how to customize:
  // https://docs.nativescript.org/webpack

  webpack.chainWebpack((config) => {
    const nsVuePath = path.resolve(__dirname, '../src/index.ts');
    config.resolve.alias.set('nativescript-vue', nsVuePath);
  });

  return webpack.resolveConfig();
};
