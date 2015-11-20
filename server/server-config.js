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
var inRouter = require('./routes/in');
var outRouter = require('./routes/out');
var path = require('path');

// require isLoggedIn method so we can use it in routes to check if user is logged in
var isLoggedIn = require('./services/isLoggedIn');

facebookStrategy(passport);

/**
 *
 *  (╯°□°)╯︵ ┻━┻
 *		- WHY USE SAME VARIABLE NAME?!
 */
// Spits out premade express.Router()
var inRoutes = inRouter(dbController, passport, isLoggedIn);
var outRoutes = outRouter(dbController, passport, isLoggedIn);


var app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(session({
  secret: "KittyCat",
  resave: true,
  saveUninitialized: false
}));
//these need to be above the route where they are used I think?
//http://stackoverflow.com/questions/29600759/passport-initialize-middleware-not-in-use-for-express-4-10-for-custom-callback
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/in', inRoutes);
app.use('/api/out', outRoutes);

app.use(express.static(path.join(__dirname, '/../client')));

module.exports = app;
