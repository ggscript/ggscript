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
  it('should successfully return template info from templatedata', function(done) {
   request(this.server)
    .get('/api/templatedata')
    .then((res) => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toEqual(3);
      done();
    })
    .catch(done.fail);
  });
  it('should successfully receive response to userdata', function (done) {
  	request(this.server)
  		.get('/api/leveldata')
  		.then((res) => {
  			expect(res.statusCode).toEqual(200);
        expect(res.body.id).toEqual(1);
        expect(res.body.levelname).toEqual('Flappy Bird Fun')
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
  it('retrieve usergames should be unauthorized if not logged in', function(done) {
    request(this.server)
      .get('/api/usergames')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        done();
      })
      .catch(done.fail);
  });
  it('retrieve userdata should be unauthorized if not logged in', function(done) {
    request(this.server)
      .get('/api/userdata')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        done();
      })
      .catch(done.fail);
  });
  it('should return not found if the api path is wrong', function(done) {
    request(this.server)
      .get('/api/path')
      .then((res) => {
        expect(res.statusCode).toEqual(404);
        done();
      })
      .catch(done.fail);
  })
  it('should POST to sharedgames', function(done) {
    request(this.server)
      .post('/api/sharedgames')
      .send({id: 97})
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        done();
      })
      .catch(done.fail);
  })
});
