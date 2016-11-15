var helpers = require('./routeHelpers');


module.exports.router = function(app) {

  app.get('/api/userdata', helpers.isLoggedIn, helpers.sendUserData);

  app.get('/api/leveldata', helpers.isLoggedIn, helpers.sendLevelData);

  app.post('/api/advancelevel', helpers.isLoggedIn, helpers.advanceLevel); 

  app.get('/api/logout', function(req, res){
  	req.logout();
  	res.redirect('/');
  });

  //Sends to Google for Authentication
  app.get('/auth/google', passport.authenticate('google', {scope : ['profile', 'email']}))

  app.get('auth/google/callback', 
  	passport.authenticate('google', {
  		successRedirect : '/profile',
  		failureRedirect : '/'
  	}));
};
