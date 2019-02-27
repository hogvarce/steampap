const path = require('path');
const merge = require('webpack-merge');
const configBase = require('./webpack.base');

config = {
    entry: ['@babel/polyfill', './src/client/index.js'],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    }
};

module.exports = merge(configBase, config);
