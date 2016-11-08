import {userData, levelData} from '../db/testData';



module.exports = {

  //send the dummy user data back
  sendDummyUserData: function(req, res) {
    console.log(userData, 'userDatarequest');
    res.sendStatus(200);
  },

  // send the dummy level data back
  sendDummyLevelData: function(req, res) {
    console.log(levelData, 'level data request');
    res.sendStatus(200);

};