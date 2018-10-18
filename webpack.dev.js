const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devServer: {
    contentBase: './dist',
    port: 9000,
    historyApiFallback: true,
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000',
      },
    },
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_URI': JSON.stringify('http://localhost:5000'),
    }),
  ],
  mode: 'development',
});
