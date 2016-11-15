const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

const db = require('../db/db');

const config = require('../config/auth');

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		// db.query(`SELECT * FROM users WHERE googleid = ${id}`, function(err, result){
		// 	done(err, result.rows[0]);
		// })
		done(null, id);
	});

	passport.use(new GoogleStrategy({
		clientID: config.googleAuth.clientID,
		clientSecret: config.googleAuth.clientSecret,
		callbackURL: config.googleAuth.callbackURL,
	},
	function(token, refreshToken, profile, done) {
		process.nextTick(function(){
			db.query(`SELECT * FROM users WHERE googleid = ${profile.id}`, function(err, result){
				if(err) {
					return done(err);
				}
				if(result.rows[0]) {
					return done(null, result.rows[0])
				} else {
					console.log('profile', profile, 'token', token);
					db.query(`INSERT INTO users (googleid, token, displayname, googleemail)
					 VALUES ('${profile.id}', '${token}', '${profile.name.givenName}', '${profile.emails[0].value}')`, function(err, result) {
					 	if(err) {
					 		throw err;
					 	}
					 	else {
					 		return done(null, result.rows[0])
					 	}
					})
				}
			})
		})
	}))
}