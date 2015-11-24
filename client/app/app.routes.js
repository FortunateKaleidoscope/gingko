(function () {
  // using 'use strict' will prevent variable declaration errors
  'use strict';

  angular.module('app')
  .config(config);

  // dependencies are injected here, when placed in array it protects against minification
  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('/', {
        url: '/',
        views: {
          top: {
            templateUrl: 'app/nav/nav.html',
            controller: 'navCtrl'
          },
          main: {
            templateUrl: 'app/landing/landing.html',
            controller: 'LandingCtrl'
          }
        }
      })
      .state('meals', {
        url: '/meals?seachBy&searchTerm',
        views: {
          top: {
            templateUrl: 'app/nav/nav.html',
            controller: 'navCtrl'
          },
          main: {
            templateUrl: 'app/meals/meals.html',
            controller: 'MealsCtrl'
          }
        }
      })
      // TODO: perhaps use URL params '/:username' to grab account details
      .state('meal', {
        url: '/meals/:mealId',
        views: {
          top: {
            templateUrl: 'app/nav/nav.html',
            controller: 'navCtrl'
          },
          main: {
            templateUrl: 'app/meal/meal.html',
            controller: 'MealCtrl'
          }
        }
      })
      // When you're linked to a unique id in a meal, we render the page
      .state('host', {
        url: '/host',
        views: {
          top: {
            templateUrl: 'app/nav/nav.html',
            controller: 'navCtrl'
          },
          main: {
            templateUrl: 'app/host/host.html',
            controller: 'HostCtrl'
          }
        }
      });
      // TODO: remove above semicolon to add more routes
  }

})();
