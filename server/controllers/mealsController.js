var meals = require('../lib/mealsHelper');
var users = require('../lib/usersHelper');
var restaurants = require('../lib/restaurantHelper');
module.exports = {
  getMeals: function (req, res) {
    //call helper functions to get all meals
    meals.getAll().then(function (meals) {
      //on success, respond with all meals
      res.json(meals);
    })
    .catch(function (err) {
      // error handling
      res.sendStatus(501, err);
    });
  },
  postMeal: function (req, res) {
    var userObj = req.body.user;
    var mealObj = req.body;
    var restaurantObj = req.body.restaurant;
    // Gets user from id provided
    users.getUserById(userObj.id)
    .then(function (user) {
      // Checks to see if restaurant exists, if not, creates it
      return restaurants.findOrCreate(restaurantObj)
      .then(function (restaurant) {
        // Creates association between user, restaurant and meal
        meals.addMeal(user, restaurant, mealObj, function (meal) {
          // Sends completed meal to client
          res.json(meal.toJSON());
        });
      });
    })
    .catch(function (err) {
      // Error handling
      res.send(500);
    });
  },
  getMealById: function (req, res) {
    // Pass id to helper function to find it in db
    meals.getMealById(req.params.id).then(function (meal) {
      // On success, respond with the meal
      res.json(meal);
    })
    .catch(function (err) {
      // Error handling
      res.sendStatus(501, err);
    });
  },
  getMealsByCity: function (req, res) {
    // Sends search term to helper function for db query
    meals.getMealsByCity(req.body.searchTerm).then(function (meals) {
      // Sends any meals that match search function
      res.json(meals);
    })
    .catch(function (err) {
      // Error handling
      res.sendStatus(501, err);
    });
  },
  joinMeal: function (req, res) {
    // Passes meal id and username to helper
    meals.joinMeal(req.params.id, req.user.username).then(function (Attendees) {
      // Success callback
      res.sendStatus(201);
    })
    .catch(function (err) {
      // Error handling
      res.sendStatus(501, err);
    });
  },
  getAttendees: function (req, res) {
    // Passes meal id to helper function
    meals.getAttendees(req.params.id).then(function (Attendees) {
      // Sends array of attendees to client
      res.json(Attendees);
    })
    .catch(function (err) {
      // Error handling
      res.sendStatus(501, err);
    });
  }
};
