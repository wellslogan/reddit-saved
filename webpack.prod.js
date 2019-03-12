const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    // https://github.com/moment/moment/issues/2416
    // LITERALLY THE EXAMPLE FOR IGNORE-PLUGIN IN
    // THE WEBPACK DOCS IS FOR THIS USECASE!
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  mode: 'production',
  // devtool: 'source-map',
});
