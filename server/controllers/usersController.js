var users = require('../lib/usersHelper');
module.exports = {
  getUserById: function (req, res) {
    // Passes user id to helper
    users.getUserById(req.params.id).then(function (user) {
      // Sends user object to user
      res.json(user);
    })
    .catch(function (err) {
      res.sendStatus(501, err);
    });
  }
};
