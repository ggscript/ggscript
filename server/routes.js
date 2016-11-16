var helpers = require('./routeHelpers');


module.exports.router = function(app, passport) {

  app.get('/api/userdata', helpers.isLoggedInHome, helpers.sendUserData);

  app.get('/api/leveldata', helpers.isLoggedInLevel, helpers.sendLevelData);

  app.post('/api/advancelevel', helpers.isLoggedIn, helpers.advanceLevel); 

  app.get('/api/logout', helpers.logout);

  app.get('/api/displayname', function(req, res) {
    console.log(req.session, 'display name request sesson');
    if(req.session.passport){
      res.send({displayname: req.session.passport.user.displayname})
    } else {
      res.sendStatus(200);
    }
  })

  //Sends to Google for Authentication
  app.get('/auth/google', passport.authenticate('google', {scope : ['profile', 'email']}), function(req, res) {
    console.log('auth google dunno what happens')

  });

  app.get('/auth/google/callback', 
  	passport.authenticate('google', {failureRedirect : '/#/', successRedirect: '/#/profile'}), (req,res) => {
		console.log(req.session, 'request session jjjjjjj');
  	});
};
