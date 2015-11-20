var Promise = require('bluebird');
var request = require('supertest');
var expect = require('chai').expect;
var dbMethods = require('../server/services/controllers');
var users = require('./users');
var meals = require('./meals');
var db = require('../server/services/db');
var Sequelize = require('sequelize');

var clearTable = function (model, done) {
  var sequelize = new Sequelize("tablesurfer", "admin", "admin", {
    dialect: "postgres",
    port: 5432
  });
  model.findAll().then(function (users) {
    return Promise.map(users, function (user) {
      return user.destroy();
    });
  }).then(function () {
    sequelize.sync({force: true})
    .then( function () {
      done();
    });
  });
};

describe('DBConfig user table', function (done) {
  beforeEach(function (done) {
    clearTable(db.Users, done);
  });
  it('should add user to table', function (done) {
    dbMethods.user.post(users[0]).then(function (message) {
      expect(message).to.exist;
      done();
    });
  });
  it('should get all users', function (done) {
    var usersLen = users.length;
    db.Users.bulkCreate(users).then(function (results) {
      dbMethods.user.get().then(function (users) {
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

describe("DBConfig restaurants", function () {
  beforeEach(function (done) {
    clearTable(db.Meals, done);
  });
  it('should create a restaurant', function (done) {

  });

});
