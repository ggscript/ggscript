var helpers = require('./routeHelpers');


module.exports.router = function(app) {

  app.get('/api/userdata', helpers.isLoggedInHome, helpers.sendUserData);

  app.get('/api/leveldata', helpers.isLoggedInLevel, helpers.sendLevelData);

  app.post('/api/advancelevel', helpers.isLoggedIn, helpers.advanceLevel); 

  app.get('/api/logout', helpers.logout);

  //Sends to Google for Authentication
  // app.get('/auth/google', passport.authenticate('google', {scope : ['profile', 'email']}))

  // app.get('/auth/google/callback', 
  // 	passport.authenticate('google', {failureRedirect : '/'}), (req,res) => {
		// // console.log(req.session, 'request session');
		// res.redirect('/#/profile');
  // 	});
};
