var Promise = require('bluebird');
var request = require('supertest');
var expect = require('chai').expect;
var app = require('../server/server-config');

describe("Routes to /api/in", function () {

  it('should route to the root folder', function (done) {
    request(app)
      .get('/')
      .expect(200, done);
  });
  it('should get /api/in/Meals', function (done) {
    request(app)
      .get('/api/in/meals')
      .expect(200, done);
  });
  it('should post /api/in/Meals', function (done) {
    request(app)
      .post('/api/in/meals')
      .send({})
      .expect(200, done);
  });
  it('should get /api/in/meals/1', function (done) {
    request(app)
      .get('/api/in/meals/1')
      .expect(200, done);
  });
  it('should get /api/in/user', function (done) {
    request(app)
      .get('/api/in/user')
      .expect(200, done);
  });
  it('should get /api/in/user/1', function (done) {
    request(app)
      .get('/api/in/user/1')
      .expect(200, done);
  });
  it('should post to /api/in/user', function (done) {
    request(app)
      .post('/api/in/user')
      .expect(200, done);
  });
});
