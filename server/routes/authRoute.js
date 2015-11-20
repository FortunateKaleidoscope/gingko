var express = require('express');
var authController = require('../controllers/authController.js');

module.exports = function ( app ) {
  app.get('/login', passport.authenticate('facebook', { scope: 'email' }));
  app.get('/login/callback', authController.loginCallback);
  app.get('/logout', authController.logout);
};