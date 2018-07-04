const webpack = require('webpack');
const path = require('path');

const config = {
  mode: process.env.NODE_ENV || 'development',

  target: 'web',

  devtool: 'source-map',

  context: __dirname,

  entry: ['core-js/fn/promise', './index.js'],

  output: {
    path: path.resolve('./'),
    filename: 'index.min.js',
    library: 'jsFetch',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
  },

  module: {
    rules: [{test: /\.js$/, use: 'babel-loader'}],
  },

  resolve: {
    extensions: ['.js'],
    modules: ['node_modules'],
  },
};

module.exports = config;
