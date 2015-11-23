var meals = require('../lib/mealsHelper');
var users = require('../lib/usersHelper');
var restaurants = require('../lib/restaurantHelper');
var searchBy = require('../lib/util').searchBy;
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
    var userObj = req.user;
    var mealObj = req.body;
    var restaurantObj = req.body.restaurant;
    users.getUserById(userObj.id)
    .then(function (user) {
      return restaurants.findOrCreate(restaurantObj)
      .then(function (restaurant) {
        meals.addMeal(user, restaurant, mealObj, function (meal) {
          res.json(meal.toJSON());
        });
      });
    })
    .catch(function (err) {
      res.send(500);
    });
  },
  getMealById: function (req, res) {
    //Pass id to helper function to find it in db
    meals.getMealById(req.params.id).then(function (meal) {
      //on success, respond with the meal
      res.json(meal);
    })
    .catch(function (err) {
      // error handling
      res.sendStatus(501, err);
    });
  },
  getMealsByCity: function (req, res) {
    meals.getMealsByCity(req.body.searchTerm).then(function (meals) {
      res.json(meals);
    })
    .catch(function (err) {
      //error handling
      res.sendStatus(501, err);
    });
  },
  joinMeal: function (req, res) {
    meals.joinMeal(req.params.id, req.user.username).then(function (Attendees) {
      res.sendStatus(201);
    });
  },
  getAttendees: function (req, res) {
    meals.getAttendees(req.params.id).then(function (Attendees) {
      console.log(Attendees);
      res.json(Attendees);
    });
  }
};
