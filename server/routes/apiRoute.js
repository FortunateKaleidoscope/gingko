var express = require('express');
var usersController = require('../controllers/usersController');
var mealsController = require('../controllers/mealsController');

module.exports = function (app) {
  app.get('/meals', mealsController.getMeals);
  app.post('/meals', mealsController.postMeal);
  app.get('/meals/:id', mealsController.getMealById);
  app.get('/users', usersController.getUsers);
  app.get('/users/:id', usersController.getUserById);
};