var helper = require('../lib/usersHelper');
module.exports = {
  getUserById: function (req, res) {
    helper.getUserById(req.body).then(function (user) {
      res.json(user);
    })
    .catch(function (err) {
      res.sendStatus(501, err);
    });
  },
  getUsers: function (req, res) {
    helper.getUsers().then(function (users) {
      res.json(users);
    })
    .catch(function (err) {
      res.sendStatus(501, err);
    });
  }
};