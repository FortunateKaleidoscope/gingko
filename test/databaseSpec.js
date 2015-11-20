var Promise = require('bluebird');
var request = require('supertest');
var expect = require('chai').expect;
var dbMethods = require('../server/services/controllers');
var users = require('./users');
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

xdescribe('DBConfig user table', function (done) {
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
  });

});

describe("DBConfig meals", function () {

});
