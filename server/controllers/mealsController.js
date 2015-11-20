var meals = require('../lib/mealsHelper');
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
    //Pass data from client to helper function to save to db
    meals.addMeal(req.body).then(function () {
      //On success
      res.sendStatus(201);
    })
    .catch(function (err) {
      // error handling
      res.sendStatus(501, err);
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
  }
};