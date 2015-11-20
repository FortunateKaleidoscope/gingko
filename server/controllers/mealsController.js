var helper = require('../lib/mealsHelper');
module.exports = {
  getMeals: function (req, res) {
    //call helper functions
    helper.getAll().then(function (meals) {
      //on success, respond with meals
      res.json(meals);
    })
    .catch(function (err) {
      // error handling
      res.sendStatus(501, err);
    });
  },
  postMeal: function (req, res) {
    helper.addMeal(req.body).then(function () {
      res.sendStatus(201);
    })
    .catch(function (err) {
      res.sendStatus(501, err);
    });
  },
  getMealById: function (req, res) {
    helper.getMealById(req.body).then(function (meal) {
      res.json(meal);
    })
    .catch(function (err) {
      res.sendStatus(501, err);
    });
  }
};