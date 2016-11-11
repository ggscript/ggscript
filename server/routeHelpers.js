var dummy = require('../db/testData');
var db = require('../db/db');

module.exports = {

  //send the dummy user data back
  sendDummyUserData: function(req, res) {
    res.send(dummy.userData);
  },

  // send the dummy level data back
  sendDummyLevelData: function(req, res) {
    res.send(dummy.levelData);
  },

  // Returns all user data including name, picture, games titles, game code, etc
  sendUserData: function(req, res){
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
              res.send(result.rows[0]);
            })
        });
      }
    );
  },

  // Returns all level 1 data which is availale to anyone visting our site otherwise access is restricted
  sendLevelData: function(req, res) {
    // Users not logged in can access level 1 (req.user.session?)
    if(!true){
      db.query(`SELECT * from leveldata WHERE leveldata.id = 1`)
        .on('end', (result) => {
          res.send(result.rows);
        });
    // Only logged in users can access their current level
    // } else {
    //   db.query(`SELECT * from leveldata, users WHERE users.currlevel = leveldata.id`)
      db.query(`SELECT * from leveldata`)
        .on('end', (result) => {
          res.send(result.rows);
        });
    }
  }
}
