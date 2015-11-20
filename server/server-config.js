var express = require('express');
// var partials = require('express-partials');
var morgan = require('morgan');
var cors = require('cors');
var dbController = require('./services/controllers');
var path = require('path');
var passport = require('passport');
var facebookStrategy = require('./services/passportStrategies');
var bodyParser = require('body-parser');
var session = require('express-session');

// require the routes file
var path = require('path');

// require isLoggedIn method so we can use it in routes to check if user is logged in
var isLoggedIn = require('./services/isLoggedIn');

facebookStrategy(passport);


var app = express();
require('./config/middleware.js')(app, express);

module.exports = app;