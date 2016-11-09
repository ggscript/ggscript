var helpers = require('./routeHelpers');

module.exports.router = function(app) {

  app.get('/api/dummydata/users', helpers.sendDummyUserData);

  app.get('/api/dummydata/levels', helpers.sendDummyLevelData);
};