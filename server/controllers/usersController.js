var users = require('../lib/usersHelper');
module.exports = {
  getUserById: function (req, res) {
    users.getUserById(req.params.id).then(function (user) {
      res.json(user);
    })
    .catch(function (err) {
      res.sendStatus(501, err);
    });
  },
  getUsers: function (req, res) {
    users.getUsers().then(function (users) {
      res.json(users);
    })
    .catch(function (err) {
      res.sendStatus(501, err);
    });
  }
};