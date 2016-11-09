var express = require('express');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');
var webpackConfig = require('../config/webpack.config.js');
var app = express();
var path = require('path');
var routes = require('./routes');
 
var compiler = webpack(webpackConfig);
 

//use the webpackdevmiddleware if NODE_ENV is not production
//alllow CORS on all requests in development mode, so
//webpack development server can be used without a proxy
if (process.env.NODE_ENV !== 'production') {
  //use webpack dev middleware
  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    stats: {
      colors: true,
    },
    historyApiFallback: true,
  }));
  // allow CORS on all traffic for development purposes
  app.use(function(req, res, next) {
    if(req.method === 'OPTIONS') {
      console.log('option request received');
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
      res.sendStatus(200);
    } else {
      next();
    }
  });
}

///serve up the static files
app.use(express.static(path.join(__dirname, '../client/public')));

//set up the router
routes.router(app);

 
var server = app.listen(process.env.PORT || 3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = server;