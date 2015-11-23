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
  addMeal: function (user, restaurant, mealObj, cb) {
    Meals.create({
      title: mealObj.title,
      date: mealObj.date,
      time: mealObj.time,
      description: mealObj.description,
      UserId: user.toJSON().id,
      RestaurantId: restaurant.toJSON().id
    })
    .then(function (meal) {
      cb(meal);
    })
    .catch(function (err) {
      console.log('Error in addMeal', err);
    });
  },
  getMealById: function (mealId) {
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
  getMealsByCity: function (city) {
    console.log("My object is ", city );
    return db.Restaurants.findAll({
      where: {
        city: city
      },
      include : [{
        model: Meals,
        include: [db.Users, db.Attendees]
      }]
    }).then(function (restaurants) {
      return restaurants;
    })
    .catch(function (err) {
      console.log('Error retrieving all meals', err);
    });
  },
  joinMeal: function (id, username) {
    return db.Users.findOne({
      where: {
        username: username
      }
    })
    .then(function (user) {
      return Meals.findOne({
        where: {
          id : id
        }
      })
      .then(function (meal) {
        return db.Attendees.create({
          MealId: meal.id,
          UserId: user.id
        })
        .then(function (result) {
          return result;
        })
        .catch(function (err) {
          console.log("Error joining meal ", err);
        });
      });
    });
  },
  getAttendees: function (mealId) {
    return db.Attendees.findAll({
      where: {
        MealId: mealId
      }
    })
    .then(function (attendees) {
      console.log(attendees);
      return Promise.map(attendees, function (attendee) {
        return db.Users.find({
          where: {
            id: attendee.toJSON().UserId
          }
        });
      });
    });
  }
};
