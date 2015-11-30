var FacebookStrategy = require('passport-facebook').Strategy;
var passport = require('passport');
var configAuth = require('./auth.js');
var usersHelper = require('../lib/usersHelper');

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(new FacebookStrategy({
  clientID: configAuth.facebookAuth.clientID,
  clientSecret: configAuth.facebookAuth.clientSecret,
  callbackURL: configAuth.facebookAuth.callbackURL
}, function (token, refreshToken, profile, done) {
  process.nextTick(function () {
    // Passport sends us the facebook profile as an object
    // we then do a findOrCreate on the user
    usersHelper.findOrCreateUser(profile)
      .then( function (user) {
        done(null, user.toJSON());
      });
  });

}));

module.exports = passport;
