var Promise = require('bluebird');
var request = require('supertest');
var expect = require('chai').expect;
var db = require('../server/services/db');
var users = require('./users');
var restaurants = require('./restaurants');

xdescribe("Server Integration tests", function () {
  before(function (done) {
    db.Users.bulkCreate(users);
  });

  it('should create new meal', function (done) {

  });

  it('should return all meals', function (done) {
    request(app)
      .get('/api/meals')
      .expect(200)
      .end(function (res) {
        // expect()
      });
  });

  it('get a meal by id', function (done) {

  });

  it('should add user to meal', function (done) {

  });

  it('should return a users meals', function (done) {

  });
  // TODO: Finish these tests
  xit('should search for stuff on yelp', function (done) {
    done();
  });
  xit('should search for stuff on googleMaps', function (done) {
    done();
  });

});
