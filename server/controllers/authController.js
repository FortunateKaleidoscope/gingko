module.exports = {
  logout: function (req, res) {
    req.logout();
    res.redirect("/");
  },
  loginCallback: function (req, res) {
    // TODO: We can do JWT here dude.
    res.redirect('/');
  },
  login: function (req, res) {
    res.send("OK");
  },
  getUser: function (req, res) {
    if (req.user) {
      res.json(req.user);
    } else {
      res.json({});
    }
  }
};
