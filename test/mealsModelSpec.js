var mealController = require('/server/path/to/mealController'); // TODO
var userController = require('/server/path/to/userController'); // TODO
var restaurantController = require('/server/path/to/restaurantController'); // TODO
var expect = require('chai').expect;
var meals = require('./meals');
var restaurants = require('./restaurants');
var users = require('./users');
var db = require('../server/services/db');
var clearTable = require('./lib/helpers').clearTable;

describe("Meals controller", function () {
  before(function (done) {
    userController.create(users[0]).then(function (user) {
      restaurantController.create(restaurants[0]).then(function (restaurant) {
        meals = meals.map(function (meal) {
          meal.UserId = user.toJSON().id;
          meal.RestaurantId = restaurant.toJSON().id;
        });
        done();
      });
    });
  });

  beforeEach(function (done) {
    clearTable(db.Meals, done);
  });

  after(function (done) {
    clearTable(db.Meals, function () {
      clearTable(db.Users, function () {
        clearTable(db.Restaurants, function () {
          done();
        });
      });
    });
  });

  // TODO: Finish these tests
  it('should create a meal with existing restaurant', function (done) {
    // NOTE: UserID and RestaurantID MUST BE
    done();
  });

  it('should get all meals', function (done) {
    done();
  });

  it('should get all meals that user is attending', function (done) {
    done();
  });

  it('should get meal by id', function (done) {
    done();
  });

});
