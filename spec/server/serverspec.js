'use strict';
const request = require('supertest');

describe('/', function () {
  it('should successfully receive response to root directory', function (done) {
    request(this.server)
      .get('/')
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        done();
      })
      .catch(done.fail);
  });
});
