var db = require('../db/db');
const crypto = require('crypto');
var highestLevel;
var link = process.env.DOMAIN || 'http://localhost:3000/';

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

  generateLink: function(req, res) {
    console.log('SENT SHARE GAME ID: ', req.body.id);
    db.query(`SELECT hash FROM sharedgames WHERE gameid = ${req.body.id}`).then(result => {
      //if the result exists
      if(result.rows[0]) {
        console.log(process.env)
        //send the hash back to the client
        res.send({link: `${link}#/sandbox?game=${result.rows[0].hash}`});
      } else { //if it doesn't exist
        //generate hash from gameid
        var hash = crypto.createHash('sha1');
        hash.update(`${req.body.id}`);
        var hashString = hash.digest('hex').slice(0, 16);
        //send hash response back to client
        res.send({link: link + '#/sandbox?game=' + hashString});
        //insert hash into database

        db.query(`INSERT INTO sharedgames (gameid, userid, hash) VALUES (${req.body.id}, ${req.session.passport.user.id}, '${hashString}')`).catch(err => console.log(err));
      }
    })


  },

  generateLink: function(req, res) {
    db.query(`SELECT hash FROM sharedgames WHERE gameid = ${req.body.id}`).then(result => {
      //if the result exists
      if(result.rows[0]) {
        console.log(process.env)
        //send the hash back to the client
        res.send({link: `${link}#/sandbox?game=${result.rows[0].hash}`});
      } else { //if it doesn't exist
        //generate hash from gameid
        var hash = crypto.createHash('sha1');
        hash.update(`${req.body.id}`);
        var hashString = hash.digest('hex').slice(0, 16);
        //send hash response back to client
        res.send({link: link + '#/sandbox?game=' + hashString});
        //insert hash into database

        db.query(`INSERT INTO sharedgames (gameid, userid, hash) VALUES (${req.body.id}, ${req.session.passport.user.id}, '${hashString}')`).catch(err => console.log(err));
      }
    })


  },


  retrieveSharedGame: function(req, res) {
    var hashString = req.query.game;
    console.log(hashString, 'hashString');
    db.query(`SELECT games.id, games.title, games.gamecode FROM games, sharedgames WHERE sharedgames.hash = '${hashString}'`)
    .then(result => {
      console.log(result, 'retrieveSharedGame')
      res.send(result.rows[0])
    })
    .catch(err => {
      res.send(err);
      console.log(err, 'retrieveSharedGame error')
    });
  },

  retrieveSharedGame: function(req, res) {
    var hashString = req.query.id;
    db.query(`SELECT games.id, games.title, games.gamecode FROM games, sharedgames WHERE sharedgames.hash = ${hashString}`)
    .then(result => res.send(result.rows[0])).catch(err => res.send(err));
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


  updatePoints: function(req, res){
    var currlevel = req.body.currlevel;
    var userid = req.session.passport.user.id;
    var difflevel;
    var points;
    if(req.body.difflevel === "Novice"){
      difflevel = 1;
      points = 10;
    }
    if(req.body.difflevel === "Heroic"){
      difflevel = 2;
      points = 20;
    }
    if(req.body.difflevel === "Mythic"){
      difflevel = 3;
      points = 30;
    }
    db.query(`SELECT * from pointevents WHERE userid = ${userid} and difflevel = ${difflevel} and levelid = ${currlevel} `)
      .on('end', (result) => {
        if(result.rows.length === 0){
          db.query(`INSERT into pointevents (levelid, difflevel, userid) VALUES (${currlevel},${difflevel},${userid})`)
            .on('end', () => {
              db.query(`UPDATE users SET points = points + ${points}  where id = ${userid}`)
            }).catch(err => res.send(err));
        }
      }).catch(err => res.send(err));
  },

  // Returns all level 1 data which is availale to anyone visting our site otherwise access is restricted
  sendLevelData: function(req, res) {
    // Users not logged in can access level 1 (req.user.session?)
    if(!req.session.passport){
      db.query(`SELECT * from leveldata WHERE leveldata.id = 1`)
        .then(result => {
          result.rows[0].noviceComplete = false;
          result.rows[0].heroicComplete = false;
          result.rows[0].mythicComplete = false;
          db.query('SELECT * from difflevelpoints').then(result3 => {
            for(var item of result3.rows){
              result.rows[0][`${item.difflevel}points`] = item.points;
            }
            res.send(result.rows[0]);
          })
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
              result.rows[0].noviceComplete = true;
            }
            if(entry.difflevel === 2){
              result.rows[0].heroicComplete = true;
            }
            if(entry.difflevel === 3){
              result.rows[0].mythicComplete = true;
            }
          })
          db.query('SELECT * from difflevelpoints').then(result3 => {
            for(var item of result3.rows){
              result.rows[0][`${item.difflevel}points`] = item.points;
            }
            res.send(result.rows[0]);
          })
        });
      });
    }
  },

  saveUserGame: function(req, res) {
    db.query(`SELECT exists (SELECT 1 FROM games WHERE title = '${req.body.title}' AND userid = ${req.session.passport.user.id})`)
      .on('end', (result) => {
        if(result.rows[0].exists){
          //masquerades single quotes by adding an additional quote
          req.body.gameCode = req.body.gameCode.replace(/'/g, "''");
          db.query(`UPDATE games SET gamecode = '${req.body.gameCode}' WHERE title = '${req.body.title}'`)
        } else {
        req.body.gameCode = req.body.gameCode.replace(/'/g, "''");
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

  retrieveUserGame: function(req, res) {
    db.query(`SELECT * FROM games WHERE userid = ${req.session.passport.user.id} AND id = ${req.query.id}`).then(result => {
      res.send(result.rows[0]);
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
    return db.query(`select pointevents.difflevel, users.id from users INNER JOIN pointevents ON users.id = pointevents.userid WHERE pointevents.levelid = users.currlevel AND users.id = ${req.session.passport.user.id}`);
  }
}
