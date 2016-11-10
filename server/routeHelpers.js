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
  }
}
