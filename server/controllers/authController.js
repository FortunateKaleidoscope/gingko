module.exports = {
  logout: function (req, res) {
    // Removes user session with express-session
    req.logout();
    // Redirects to root route
    res.redirect("/");
  },
  loginCallback: function (req, res) {
    // After successful login callback, redirects user to root
    res.redirect('/');
  },
  login: function (req, res) {
    res.send("OK");
  },
  getUser: function (req, res) {
    // Checks if user is authenticated with Passport and Facebook
    if (req.user) {
      // If so, returns the user object to client
      res.json(req.user);
    } else {
      // Else, returns an empty object indicating user is not authenticated
      res.json({});
    }
  }
};
