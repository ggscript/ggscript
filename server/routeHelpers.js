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
  sendUserData: function(req, res) {
    db.query(`SELECT * FROM users, titlepoints, games WHERE users.id = 1 AND titlepoints.points = users.points`)
      .on('end', (result) => {
      res.send(result.rows);
    });
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
    } else {
      db.query(`SELECT * from leveldata, users WHERE users.currlevel = leveldata.id`)
        .on('end', (result) => {
          res.send(result.rows);
        });
    }
  }
}
