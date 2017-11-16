const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './src/main.js'],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'docs.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',

          options: {
            presets: ['babel-preset-env']
          }
        }
      }
    ]
  }
}