var usersController = require('../controllers/usersController');
var mealsController = require('../controllers/mealsController');
var externalController = require('../controllers/externalController');

module.exports = function (app) {
  app.get('/meals', mealsController.getMeals);
  app.post('/meals', mealsController.postMeal);
  app.get('/meals/:id', mealsController.getMealById);
  app.get('/users', usersController.getUsers);
  app.get('/users/:id', usersController.getUserById);
  app.get('/yelp', externalController.getYelpData);
  app.get('/googleMaps', externalController.getGoogleMaps);
  app.post('/meals/search/city/', function (req, res, next) {
    console.log(req.body);
    next();
  }, mealsController.getMealsByCity);
  app.post('/meals/:id/join', mealsController.joinMeal);
  app.get('/meals/:id/attending', mealsController.getAttendees);

  //lauren's following routes below:
  // app.post('/users/:id/following', usersController.follow);
  // app.delete('/users/:id/following', usersController.unfollow);
  app.get('/users/:id/following', usersController.getAllFollowing);
};
