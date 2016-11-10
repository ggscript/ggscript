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

  sendUserData: function(req, res) {
    db.query(`SELECT * FROM users WHERE users.id = 1`).on('end', (result) => {
      res.send(result.rows);
    });
  }
}
