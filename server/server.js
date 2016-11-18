var express = require('express');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');
var webpackConfig = require('../config/webpack.dev.config.js');
var session = require('express-session');
var passport = require('passport');
var google = require('./passport');
var path = require('path');
var routes = require('./routes');
var bodyParser = require('body-parser');

var compiler = webpack(webpackConfig);

var app = express();

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
      res.header('Access-Control-Allow-Credentials', true);
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
      next();
  });
}
///use session
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ 
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {  
    maxAge: 600000 * 3, //30 min
    secure: false
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

///serve up the static files
// parse application/x-www-form-urlencoded

// parse application/json

//set up the router
google(passport);



routes.router(app, passport);
app.use(express.static(path.join(__dirname, '../client/public')));

var server = app.listen(process.env.PORT || 3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = server;
