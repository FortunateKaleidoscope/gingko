var db = require('../config/db');
var Promise = require('bluebird');

module.exports = {
  // finds user by id
  getUserById: function (userId) {
    return db.Users.findOne({
      where: {
        id: userId
      }
    })
    .then(function (user) {
      return user;
    })
    .catch(function (err) {
      console.log("Error retrieving user by Id ", err);
    });
  },
  // finds or creates a new user
  findOrCreateUser: function (user) {
    return db.Users.findOrCreate({
      where: {
        username: user.displayName,
        facebookId: user.id
      }
    }).spread(function (users, created) {
      return users;
    });
  }
};
