var morgan = require('morgan');
var bodyParser = require('body-parser');
var passport = require('./passport');
var session = require('express-session');

module.exports = function (app, express) {
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

  //Set up routers
  var authRoute = express.Router();
  var apiRoute = express.Router();

  app.use('/api', apiRoute);
  require('./routes/apiRoute')(apiRoute);
  app.use('/auth', authRoute);
  require('./routes/authRoute')(authRoute);

  app.use(express.static(path.join(__dirname, '/../client')));
};