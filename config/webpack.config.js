const path = require('path');

module.exports = {
  context: path.join(__dirname, '../client/app'),
  entry: './index.js',
  output: {
    path: path.join(__dirname, '../client/public'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
    ]
  }
}
