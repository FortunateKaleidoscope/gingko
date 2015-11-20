var authController = require('../controllers/authController.js');
var passport = require('../config/passport');

module.exports = function ( app ) {
  app.get('/login', passport.authenticate('facebook', {
    scope: 'email'
  }), authController.login);

  app.get('/login/callback', passport.authenticate('facebook', {
    failureRedirect: '/'
  }), authController.loginCallback);

  app.get('/logout', authController.logout);
};
