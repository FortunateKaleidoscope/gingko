var morgan = require('morgan');
var bodyParser = require('body-parser');
// var passport = require('passport');
var session = require('express-session');
// var facebookStrategy = require('../services/passportStrategies');
var path = require('path');

module.exports = function (app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, '/../client')));

  // Uses sessions
  app.use(session({
    secret: "KittyCat",
    resave: true,
    saveUninitialized: false
  }));

  // facebookStrategy(passport);

  // app.use(passport.initialize());
  // app.use(passport.session());

  //Set up routers
  var authRoute = express.Router();
  var apiRoute = express.Router();

  app.use('/api', apiRoute);
  require('../routes/apiRoute')(apiRoute);

  app.use('/auth', authRoute);
  require('../routes/authRoute')(authRoute);

};