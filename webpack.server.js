const path = require('path');
const merge = require('webpack-merge');
const configBase = require('./webpack.base');
const nodeExternals = require('webpack-node-externals');

config = {
  target: 'node',
  entry: ['@babel/polyfill', './src/server/index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js',
  },
  externals: [nodeExternals()],
};

module.exports = merge(configBase, config);
