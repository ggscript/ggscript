'use strict';
const server = require('../../server/server.js');

beforeAll(function (done) {
  this.server = server;
  done();
});

beforeEach(function () {
});

afterEach(function (done) {
    done();
});