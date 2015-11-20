var FacebookStrategy = require('passport-facebook').Strategy;
var passport = require('passport');
var configAuth = require('./auth.js');
// var database = require('../db.js');

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
    console.log(profile);
    done(null, profile);
  });

}));

module.exports = passport;
