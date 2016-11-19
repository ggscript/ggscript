var helpers = require('./routeHelpers');


module.exports.router = function(app, passport) {

  app.get('/api/userdata', helpers.isLoggedIn, helpers.sendUserData);

  app.get('/api/leveldata', helpers.sendLevelData);

  app.post('/api/updatelevel', helpers.isLoggedIn, helpers.updateLevel); 

  app.post('/api/saveleveldata', helpers.isLoggedIn, helpers.saveLevelData);

  app.get('/api/logout', helpers.logout);

  app.get('/api/displayname', function(req, res) {
    if(req.session.passport){
      res.send({displayname: req.session.passport.user.displayname})
    } else {
      res.send({displayname: undefined});
    }
  })

  //Sends to Google for Authentication
  app.get('/auth/google', passport.authenticate('google', {scope : ['profile', 'email']}), function(req, res) {

  });

  app.get('/auth/google/callback', 
  	passport.authenticate('google', {failureRedirect : '/#/login', successRedirect: '/#/profile'}), (req,res) => {
  	});

  app.get('/api/templatedata', helpers.sendTemplateData);


};
