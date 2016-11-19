var db = require('../db/db');
var user = require('./server');
var highestLevel;

module.exports = {

  getLastLevel: function(req, res){
    return db.query(`SELECT max(id) from leveldata`);
  },


  sendLevelList: function(req,res, callback) {
    db.query(`SELECT id, levelname, shortdesc From leveldata`)
      .on('end', (result) => {
        callback(result.rows);
      });
  },


  // Returns all user data including name, picture, games titles, game code, etc
  sendUserData: function(req, res){
    db.query(`SELECT * FROM users WHERE id = ${req.session.passport.user.id}`)
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
  updateLevel: function(req, res) {
    //set curr level to curr level + one if request is for advance level (from next button on client learn page)
    //set curr level to currlevel if request is for select level (from level select on client profile page)
    var level = req.body.advance ? req.body.currlevel + 1 : req.body.currlevel;

    module.exports.getLastLevel().then(result=>{
      lastLevel = result.rows[0].max;
      //if level is above max level (user has completed all levels), reset level to max level to avoid foreign key error
      if(level > lastLevel) {
        level--;
      }
      //update the users level
      db.query(`UPDATE users SET currlevel = ${level} WHERE id = ${req.session.passport.user.id}`).on('end', result => {
        res.sendStatus(200)
      }).catch(err=>res.send(err));

      //after sending response, update the user's maxlevel if needed
      db.query(`UPDATE users SET maxlevel = CASE WHEN maxlevel < ${level} THEN ${level} ELSE maxlevel END WHERE id = ${req.session.passport.user.id}`).catch(err => console.log(err));


    })
    


  },

  // Returns all level 1 data which is availale to anyone visting our site otherwise access is restricted
  sendLevelData: function(req, res) {
    // Users not logged in can access level 1 (req.user.session?)
    if(!req.session.passport){
      db.query(`SELECT * from leveldata WHERE leveldata.id = 1`)
        .on('end', (result) => {
          res.send(result.rows[0]);
        });
    // Only logged in users can access their current level
    } else {
      db.query(`SELECT leveldata.id, leveldata.levelname, leveldata.prompt, leveldata.description_subone, leveldata.description_descone, leveldata.description_subtwo, leveldata.description_desctwo, leveldata.description_subthree, leveldata.description_descthree, leveldata.tldr, leveldata.shortdesc, leveldata.hint1, leveldata.hint2, leveldata.hint3, leveldata.heroiclevelcode, leveldata.mythiclevelcode, leveldata.novicelevelcode from leveldata, users WHERE leveldata.id = users.currlevel AND users.id = ${req.session.passport.user.id}`)
        .then( result => {
          module.exports.getLevelPointsData(req,res).then( result2 => {
          //var clientResponse = {1: false, 2: false, 3: false}
          result.rows[0].noviceComplete = false;
          result.rows[0].heroicComplete = false;
          result.rows[0].mythicComplete = false;
          result2.rows.forEach(entry => {
            if(entry.difflevel === 1){
              result[noviceComplete] = true;
            }
            if(entry.difflevel === 2){
              result[heroicComplete] = true;
            }
            if(entry.difflevel === 3){
              result[mythicComplete] = true;
            }
            res.send(result.rows[0]);
          })
        });
      });
    }
  },

  saveLevelData: function(req, res) {
    if(!req.passport){
      res.redirect('/');
    }
    db.query(`SELECT exists (SELECT 1 FROM games WHERE title = '${req.body.title}' AND userid = ${req.session.passport.user.id})`)
      .on('end', (result) => {
        if(result.rows[0].exists){
          console.log('this exists');
          db.query(`UPDATE games SET gamecode = '${req.body.gameCode}' WHERE title = '${req.body.title}'`)
        } else {
        db.query(`INSERT INTO games (userid, title, gamecode)
           VALUES (${req.session.passport.user.id}, '${req.body.title}', '${req.body.gameCode}')`, function(err) {
            if(err) {
              throw err;
            }
            else {
              console.log('ugh');
            }
          })
        }
      }) 
  },

  logout: function(req,res) {
    req.session.destroy();
    req.logout();
    res.redirect('/');
  },


  isLoggedInLevel: function(req, res, next) {
    if(req.isAuthenticated()){
      return next();
    }
    return next();
  },

  isLoggedIn: function(req, res, next){
    if(req.isAuthenticated()){
      next();
    }
    else {
      res.sendStatus(401);
    }
  },


  sendTemplateData: function(req, res) {
    db.query(`SELECT * FROM templates`)
      .on('end', (result) => {
        res.send(result.rows);
      });
  },
//select difflevel, users.currlevel from users, pointevents 
//where users.id = 7 and pointevents.levelid = users.currlevel
  getLevelPointsData: function(req, res){
    return db.query(`SELECT difflevel FROM users, pointevents WHERE users.id = 7 and pointevents.levelid = users.currlevel`)
  }
}
