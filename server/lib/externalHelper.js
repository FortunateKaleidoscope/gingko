var Promise = require('bluebird');
var qs = require('querystring');
var oauthSignature = require('oauth-signature');
var n = require('nonce')();
var _ = require('lodash');
var auth = require('../config/auth');
var request = Promise.promisify(require("request"));
Promise.promisifyAll(request);

module.exports = {
  requestYelp: function (params) {
      // params: object with params to search
    // callback: callback(error, response, body)
    var httpMethod = 'GET';
    var url = 'http://api.yelp.com/v2/search';

    var default_parameters = {
      location: 'San+Francisco',
      sort: '0'
    };
    var required_parameters = {
      oauth_consumer_key : auth.oauth.consumer_key,
      oauth_token : auth.oauth.token,
      oauth_nonce : n(),
      oauth_timestamp : n().toString().substr(0, 10),
      oauth_signature_method : 'HMAC-SHA1',
      oauth_version : '1.0'
    };

    // parameters combined in order of importance
    var parameters = _.assign(default_parameters, params, required_parameters);

    var consumerSecret = auth.yelp.consumerSecret;
    var tokenSecret = auth.yelp.tokenSecret;

    /* Then we call Yelp's Oauth 1.0a server, and it returns a signature */
    /* Note: This signature is only good for 300 seconds after the oauth_timestamp */
    var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false});
    parameters.oauth_signature = signature;
    var paramURL = qs.stringify(parameters);
    var apiURL = url + '?' + paramURL;

    return request(apiURL)
    .then(function (response) {
      return JSON.parse(response.body).businesses;
    });
  }

};