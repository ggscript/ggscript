const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


const db = require('../db/db');

if(process.env.NODE_ENV !== 'production'){
	var configAuth = require('../config/auth');
}


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
		console.log(user, 'serializeUser')
    	done(null, user);
    	console.log(user, 'after serializeUser')
	});

	passport.deserializeUser(function(user, done){
		console.log(user, 'deserializeUser')
    // db.query(`SELECT * FROM users WHERE googleid = ${user.id}`, function(err, result){
    //  done(err, user);
    // })
    done(null, user);
    console.log('after deserialize')
	});

	passport.use(new GoogleStrategy({
		clientID: configAuth.googleAuth.clientID,
		clientSecret: configAuth.googleAuth.clientSecret,
		callbackURL: configAuth.googleAuth.callbackURL
	},
	function(token, refreshToken, profile, done) {
		process.nextTick(function(){
			console.log('1st thing - passport.use')
			//look for user
			db.query(`SELECT * FROM users WHERE googleemail = '${profile.emails[0].value}'`, function(err, result){
				if(err) {
					done(err);
				}
				//if the user exists, call the done callback on the user
				if(result.rows.length) {
					return done(null, result.rows[0]);
				} else {
					console.log('I got in');
					//if the user doesn't exist, add the user to the database
					db.query(`INSERT INTO users (displayname, googleemail)
					 VALUES ('${profile.name.givenName}', '${profile.emails[0].value}')`, function(err, result) {
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