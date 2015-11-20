var FacebookStrategy = require('passport-facebook').Strategy;
var passport = require('passport');
var configAuth = require('./auth.js');
var database = require('./db.js');

passport.serializeUser(function (user, done) {
  console.log("user inside serialize", user);
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  database.Users.find({
    where: {
      id: user.id
    }
  }).then(function (userObj) {
    done(null, userObj);
  }).catch(function (err) {
    console.log(err);
  });
});

passport.use(new FacebookStrategy({
  clientID: configAuth.facebookAuth.clientID,
  clientSecret: configAuth.facebookAuth.clientSecret,
  callbackURL: configAuth.facebookAuth.callbackURL
}, function (token, refreshToken, profile, done) {
  process.nextTick(function () {
    database.Users.findOrCreate({
      where: {
        facebookId: profile.id,
        username: profile.displayName
      }
    })
    .then(function (user) {
      done(null, user[0]);
    })
    .catch(function (err) {
      console.log('err', err);
      done(err);
    });
  });

}));

module.exports = passport;
