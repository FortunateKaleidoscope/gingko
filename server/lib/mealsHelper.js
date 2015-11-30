var Meals = require('../config/db.js').Meals;
var Promise = require('bluebird');
var db = require('../config/db.js');

// Gets the meals attendees, then builds an object
// with the meal details and an array of attendees
var buildMeal = function (meal) {
    return module.exports.getAttendees(meal.id)
    .then(function (attendees) {
        return {
          meal: meal,
          attending: attendees
        };
      })
      .catch(function (err) {
        console.log("Error building a meal ", err);
      });
};

module.exports = {
  //fetch all meals from db
  getAll : function () {
    return Meals.findAll({
      // Meals also returns the Host's user info and the Restaurant info
      include: [
        db.Users,
        db.Restaurants
      ]
    })
    .then(function (meals) {
      //return all meals with their user and restaurant data
      return Promise.map(meals, function (meal) {
        // adds attendees
        return buildMeal(meal);
      });
    })
    .catch(function (err) {
      console.log('Error retrieving all meals', err);
    });
  },

  // Takes the sequelize userObj, restaurantObj
  // then creates a meal with the data passed in from the user
  // plus the id's of the restaurant and the Host
  addMeal: function (user, restaurant, mealObj, cb) {
    Meals.create({
      title: mealObj.title,
      date: mealObj.date,
      description: mealObj.description,
      maxAttendees: mealObj.maxAttendees,
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
  // Finds the meal by the id
  getMealById: function (mealId) {
    return Meals.findOne({
      where: {
        id: mealId
      },
      include: [
        db.Users,
        db.Restaurants
      ]
    })
    .then(function (meal) {
      // builds out the meal with the attendees
      return buildMeal(meal);
    })
    .catch(function (err) {
      console.log("Error retrieving meal by Id ", err);
    });
  },
  // Does a look up on the meals within a city
  getMealsByCity: function (city) {
    return db.Meals.findAll({
      include: [{
        model: db.Restaurants,
        where: {
          city: {
            $iLike: city
          }
        }
      }]
    }).then(function (meals) {
      return Promise.map(meals, function (meal) {
        return buildMeal(meal);
      });
    });
  },
  // gets the user
  // then the meal
  // then adds the userId and the mealId to a join table
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
  // Gets all of the userIds where mealId == mealId
  getAttendees: function (mealId) {
    return db.Attendees.findAll({
      where: {
        MealId: mealId
      }
    })
    .then(function (attendees) {
      // returns an array of attendee ids
      // map over the attendees and find each of the users
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
