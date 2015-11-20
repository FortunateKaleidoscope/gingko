var db = require('../config/db');
var Promise = require('bluebird');

module.exports = {
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
  getUsers: function () {
    return db.Users.findAll()
    .then(function (users) {
      return users;
    })
    .catch(function (err) {
      console.log("Error retrieving all users ", err);
    });
  }
};