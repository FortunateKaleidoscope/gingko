var external = require('../lib/externalHelper');
var qs = require('querystring');

module.exports = {
  getYelpData: function (req,res) {
    var params = {
      term: req.query.term,
      limit: "10"
    };
    external.requestYelp(params).then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.sendStatus(501, err);
    });
  },
  getGoogleMaps: function (req, res) {
    res.send("OK");
  }
};