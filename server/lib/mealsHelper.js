var Meals = require('../config/db.js').Meals;
var Promise = require('bluebird');
var db = require('../config/db.js');

var buildMeal = function (meal) {
  return db.Users.findOne({
        where: {
          id: meal.UserId
        }
      })
      .then(function (user) {
        return db.Restaurants.findOne({
          where: {
            id: meal.RestaurantId
          }
        })
        .then(function (restaurant) {
          return {
            meal: meal,
            user: user,
            restaurant: restaurant
          };
        })
        .catch(function (err) {
          console.log("Error building a meal ", err);
        });
  });
};

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
      return Promise.map(meals, function (meal) {
        return buildMeal(meal);
      });
    })
    .catch(function (err) {
      console.log('Error retrieving all meals', err);
    });
  },
  addMeal: function (req) {
    //save meal to db
    // console.log('INSIDE MEAL HELPER ', meal);
    var meal = req.body;
    var user = req.user;
    return db.Users.findOne({
      where: {
        username: user.username
      }
    })
    .then(function (userObj) {
      var restaurantObj = meal.restaurant;
      return db.Restaurants.findOrCreate({
        where: {
          contact: restaurantObj.phone
        },
        defaults: {
          name: restaurantObj.name,
          address: restaurantObj.display_address,
          contact: restaurantObj.phone,
          lat: restaurantObj.coordinate.lat,
          lng: restaurantObj.coordinate.lng
        }
      })
      .spread(function (restaurant) {
        console.log(userObj);
        return Meals.create({
          title: meal.title,
          date: meal.date,
          time: meal.time,
          description: meal.description,
          UserId: userObj.toJSON().id,
          RestaurantId: restaurant[0].toJSON().id
        }).then(function (meal) {
          console.log('Created Meal?', meal);
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
      return buildMeal(meal);
    })
    .catch(function (err) {
      console.log("Error retrieving meal by Id ", err);
    });
  },
  getMealsBySearch: function (searchObj) {
    return Meals.findAll(searchObj).then(function (meals) {
      return Promise.map(meals, function (meal) {
        return buildMeal(meal);
      });
    })
    .catch(function (err) {
      console.log('Error retrieving all meals', err);
    });
  }
};
