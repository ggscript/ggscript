path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, 'client/app'),
  devtool: 'cheap-module-source-map',
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'client/public'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel']
      }
    ],
  },
  plugins: [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  })
  ],
};