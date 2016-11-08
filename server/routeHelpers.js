var dummy = require('../db/testData');



module.exports = {

  //send the dummy user data back
  sendDummyUserData: function(req, res) {
    res.send(dummy.userData);
  },

  // send the dummy level data back
  sendDummyLevelData: function(req, res) {
    res.send(dummy.levelData);
  }
}