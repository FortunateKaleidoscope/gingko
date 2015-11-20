var express = require('express');
var authController = require('../controllers/authController.js');

module.exports = function ( app ) {
  app.get('/login', authController.login);
  app.get('/login/callback', authController.loginCallback);
  app.get('/logout', authController.logout);
};