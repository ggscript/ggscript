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
  it('should successfully receive response to userdata', function (done) {
  	request(this.server)
  		.get('/api/leveldata')
  		.then((res) => {
  			expect(res.statusCode).toEqual(200);
  			done();
  		})
  		.catch(done.fail);
  });
  it('should successfully receive response to sharedgames', function (done) {
  	request(this.server)
  		.get('/api/sharedgames')
  		.then((res) => {
  			expect(res.statusCode).toEqual(200);
  			done();
  		})
  		.catch(done.fail);
  }); 
});
