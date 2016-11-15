var db = require('../db/db');

module.exports = {



  sendLevelList: function(req,res, callback) {
    db.query(`SELECT id, levelname, shortdesc From leveldata`)
      .on('end', (result) => {
        callback(result.rows);
      });
  },


  // Returns all user data including name, picture, games titles, game code, etc
  sendUserData: function(req, res){
    console.log(req.scope, 'response');
    db.query(`SELECT * FROM users WHERE id = 1`)
      .on('end', (result) => {
        db.query(`SELECT title, id FROM games WHERE games.userid = ${result.rows[0].id} `)
        .on('end', (result2) => {
          result.rows[0].savedgames = [];
          for(var i = 0; i < result2.rows.length; i ++){
            result.rows[0].savedgames.push(result2.rows[i]);
          }
          db.query(`SELECT title FROM titlepoints WHERE points <= ${result.rows[0].points}`)
            .on('end', (result3) => {
              result.rows[0].title = result3.rows[result3.rows.length-1].title;
              module.exports.sendLevelList(req, res, function(levelList){
                result.rows[0].levels = levelList;
                result.rows[0].levels.sort(function(a,b) {return a.id-b.id});
                res.setHeader('content-type', 'application/json');
                res.json(result.rows[0]);
              })
              // res.send(result.rows[0]);
            })
        });
      }
    );
  },

  //advances the users level
  advanceLevel: function(req, res) {
    console.log(req.body, 'request recieved for advance level')
    db.query(`UPDATE users SET currlevel = ${req.body.level} WHERE id = ${req.body.id}`).then(result => res.sendStatus(200)).catch(err=>res.send(err));
  },

  // Returns all level 1 data which is availale to anyone visting our site otherwise access is restricted
  sendLevelData: function(req, res) {
    // Users not logged in can access level 1 (req.user.session?)
    if(!true){
      db.query(`SELECT * from leveldata WHERE leveldata.id = 1`)
        .on('end', (result) => {
          res.send(result.rows[0]);
        });
    // Only logged in users can access their current level
    } else {
      console.log('yayayayayayaya')
      db.query(`SELECT leveldata.id, leveldata.levelname, leveldata.prompt, leveldata.description_subone, leveldata.description_descone, leveldata.description_subtwo, leveldata.description_desctwo, leveldata.description_subthree, leveldata.description_descthree, leveldata.tldr, leveldata.shortdesc, leveldata.hint1, leveldata.hint2, leveldata.hint3, leveldata.heroiclevelcode, leveldata.mythiclevelcode, leveldata.novicelevelcode from leveldata, users WHERE leveldata.id = users.currlevel AND users.id = ${req.query.id}`)
        .on('end', (result) => {
          console.log('database redulsts', result.rows)
          res.send(result.rows[0]);
        });
    }
  },

  logout: function(req,res) {
    console.log('good bye');
    req.logout();
    res.redirect('/');
  },
  //Route middleware to make sure the user is logged in.
  isLoggedInHome: function(req, res, next) {
    if(req.isAuthenticated()){
      return next();
    }
    return next();

  },

  isLoggedInLevel: function(req, res, next) {
    if(req.isAuthenticated()){
      return next();
    }
    return next();
  },

  isLoggedIn: function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    else {
      res.sendStatus(404);
    }
  }
}
