var Promise = require('bluebird');
var request = require('supertest');
var restaurantController = require('/server/path/to/restaurantController'); // TODO
var expect = require('chai').expect;
var restaurants = require('./restaurants');
var db = require('../server/services/db');
var clearTable = require('./lib/helpers').clearTable;

describe("Restaurants controller", function () {
  beforeEach(function (done) {
    clearTable(db.Restaurants, done);
  });

  it('should create a restaurant', function (done) {
    restaurantController.create(restaurants[0]).then(function (response) {
      expect(response).to.be.instanceOf(Object);
      expect(response).to.have.property('created'); // Maybe?
      done();
    });
  });

  it('should get all restaurants', function (done) {
    db.Restaurants.bulkCreate(restaurants).then(function () {
      restaurantController.getAll().then(function (rests) {
        rests = rests.map(function (rest) {
          return rest.toJSON();
        });
        expect(rests.length).to.equal(restaurants.length);
        expect(rests[0]).to.have.property('contact');
        done();
      });
    });
  });

});
