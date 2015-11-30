var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('./passport');
var path = require('path');
var auth = require('./auth');

module.exports = function (app, express) {
  // Logging
  app.use(morgan('dev'));
  // Parses urlencoded queries
  app.use(bodyParser.urlencoded({extended: true}));
  // Parses JSONs sent to the server
  app.use(bodyParser.json());
  // sets static folder to client
  app.use(express.static(path.join(__dirname, '/../../client')));

  // Uses sessions
  app.use(session({
    secret: auth.SESSION_SECRET,
    resave: true,
    saveUninitialized: false
  }));

  // init's passport session
  app.use(passport.initialize());
  app.use(passport.session());

  //Set up routers
  var authRoute = express.Router();
  var apiRoute = express.Router();

  app.use('/api', apiRoute);
  require('../routes/apiRoute')(apiRoute);

  app.use('/auth', authRoute);
  require('../routes/authRoute')(authRoute);

};
