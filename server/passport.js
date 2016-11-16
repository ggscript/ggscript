const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


const db = require('../db/db');

const configAuth = require('../config/auth');

module.exports = function(passport) {
	// passport.serializeUser(function(user, done) {
	// 	done(null, user);
	// });

	// passport.deserializeUser(function(id, done){
	// 	// db.query(`SELECT * FROM users WHERE googleid = ${id}`, function(err, result){
	// 	// 	done(err, result.rows[0]);
	// 	// })
	// 	done(null, user);
	// });

	passport.serializeUser((user, done) => {
    	console.log(user, "user");
    	return done(null, user);
	});

	passport.deserializeUser(function(user, done){
    // db.query(`SELECT * FROM users WHERE googleid = ${id}`, function(err, result){
    //  done(err, result.rows[0]);
    // })
    // console.log('bye');
    	done(null, user);
	});

	passport.use(new GoogleStrategy({
		clientID: configAuth.googleAuth.clientID,
		clientSecret: configAuth.googleAuth.clientSecret,
		callbackURL: configAuth.googleAuth.callbackURL
	},
	function(token, refreshToken, profile, done) {
		process.nextTick(function(){
			console.log('profile', profile.id, 'token', token);
			db.query(`SELECT * FROM users WHERE googleid = ${profile.id}`, function(err, result){
				if(err) {
					done(err);
				}
				if(result.rows[0]) {
					return done(null, result.rows[0]);
				} else {
					db.query(`INSERT INTO users (googleid, token, displayname, googleemail)
					 VALUES ('${profile.id}', '${token}', '${profile.name.givenName}', '${profile.emails[0].value}')`, function(err, result) {
					 	if(err) {
					 		throw err;
					 	}
					 	else {
					 		return done(null, result.rows[0]);
					 	}
					})
				}
			})
		})
	}))
}