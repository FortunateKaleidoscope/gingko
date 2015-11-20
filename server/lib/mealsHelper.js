var Meals = require('../config/db.js').Meals;
var Promise = require('bluebird');
var db = require('../config/db.js');

module.exports = {
  getAll : function () {
    //fetch all meals from db
    return Meals.findAll({
      //includes required tables
      include: [
        db.Users,
        db.Restaurants
      ]
    })
    .then(function (meals) {
      //return all meals with their user and restaurant data
      return meals;
    })
    .catch(function (err) {
      console.log('Error retrieving all meals', err);
    });
  },
  postMeal: function (meal) {
    //save meal to db
    return db.Users.findOne({
      where: {
        username: meal.username
      }
    })
    .then(function (user) {
      return db.Restaurants.findOrCreate({
        where: {
          name: meal.restaurant
        },
        defaults: {
          name: meal.restaurant,
          address: meal.address,
          contact: meal.contact,
          lat: meal.latitude,
          lng: meal.longitude
        }
      })
      .then(function (restaurant) {
        return Meals.create({
          title: meal.title,
          date: meal.date,
          time: meal.time,
          description: meal.description,
          UserId: user.dataValues.id,
          RestaurantId: restaurant[0].dataValues.id
        }).then(function (meal) {
          return meal;
        })
        .catch(function (err) {
          console.log("Error saving meal to db ", err);
        });
      });
    });
  },
  getMealById: function (mealId) {
    //fetch meal by id
    return Meals.findOne({
      where: {
        id: mealId
      }
    })
    .then(function (meal) {
      return meal;
    })
    .catch(function (err) {
      console.log("Error retrieving meal by Id ", err);
    });
  }
};