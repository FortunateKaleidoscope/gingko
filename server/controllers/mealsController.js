var meals = require('../lib/mealsHelper');
module.exports = {
  getMeals: function (req, res) {
    //call helper functions
    meals.getAll().then(function (meals) {
      //on success, respond with meals
      res.json(meals);
    })
    .catch(function (err) {
      // error handling
      res.sendStatus(501, err);
    });
  },
  postMeal: function (req, res) {
    meals.addMeal(req.body).then(function () {
      res.sendStatus(201);
    })
    .catch(function (err) {
      res.sendStatus(501, err);
    });
  },
  getMealById: function (req, res) {
    meals.getMealById(req.body).then(function (meal) {
      res.json(meal);
    })
    .catch(function (err) {
      res.sendStatus(501, err);
    });
  }
};