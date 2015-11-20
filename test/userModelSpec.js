var Promise = require('bluebird');
var request = require('supertest');
var userController = require('/server/path/to/userController'); // TODO
var expect = require('chai').expect;
var users = require('./users');
var db = require('../server/services/db');
var clearTable = require('./lib/helpers').clearTable;

describe('DBConfig user table', function (done) {
  beforeEach(function (done) {
    clearTable(db.Users, done);
  });
  it('should add user to table', function (done) {
    userController.create(users[0]).then(function (message) {
      expect(message).to.exist;
      done();
    });
  });
  it('should get all users', function (done) {
    var usersLen = users.length;
    db.Users.bulkCreate(users).then(function (results) {
      userController.getAll().then(function (users) {
        users = users.map(function (user) {
          return user.toJSON();
        });
        expect(users).to.be.instanceOf(Array);
        expect(users[0]).to.have.property('facebookId');
        expect(users.length).to.equal(usersLen);
        done();
      });
    });
  });
  xit('should add user to a meal', function (done) {
    db.Users.bulkCreate(users).then(function (results) {
      // TODO: Add user to meal
    });
  });

});
