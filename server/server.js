var express = require('express');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');
var webpackConfig = require('../config/webpack.config.js');
var app = express();
var path = require('path');
 
var compiler = webpack(webpackConfig);
 
app.use(express.static(path.join(__dirname, '../client/public')));

//use the webpackdevmiddleware if NODE_ENV is not production
if (process.env.NODE_ENV !== 'production') {
  console.log(__dirname, 'diiiiirname');
  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    stats: {
      colors: true,
    },
    historyApiFallback: true,
  }));  
}

app.get('/api/test', function(req, res) {
  console.log('request recieved');
  res.send('success - proxy is working');
})
 
var server = app.listen(process.env.PORT || 3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = server;