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
  //lauren's friend routes below:
  app.post('/users/:id/friends', usersController.addFriend);
  app.delete('/users/:id/friends', usersController.deleteFriend);
  app.get('users/:id/friends', usersController.getAllFriends);
};
