var external = require('../lib/externalHelper');
var qs = require('querystring');

module.exports = {
  requestYelp: function (req, res) {
    // Builds paramater object to pass to yelp
    var params = {
      term: req.query.term,
      limit: "10",
      location: req.query.city.replace(' ', '+')
    };
    // Calls helper and feeds in param object
    external.requestYelp(params).then(function (data) {
      // Returns result to client
      res.json(data);
    })
    .catch(function (err) {
      // Error handling for Yelp search
      res.sendStatus(501, err);
    });
  }
};
