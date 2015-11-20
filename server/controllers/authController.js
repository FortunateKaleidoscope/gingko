module.exports = {
  logout: function (req, res) {
    req.logout();
    res.send("OK");
  },
  loginCallback: function (req, res) {
    // TODO: We can do JWT here dude.
    res.redirect('/');
  },
  login: function (req, res) {
    res.send("OK");
  }
};
