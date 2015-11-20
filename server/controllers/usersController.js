var helpers = require('../lib/helpers');
module.exports = {
  getUserById: function (req, res) {
    helpers.getUserById(req.body).then(function (user) {
      res.json(user);
    })
    .catch(function (err) {
      res.sendStatus(501, err);
    });
  },
  getUsers: function (req, res) {
    helpers.getUsers().then(function (users) {
      res.json(users);
    })
    .catch(function (err) {
      res.sendStatus(501, err);
    });
  }
};