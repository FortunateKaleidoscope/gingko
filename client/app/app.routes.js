(function () {
  // using 'use strict' will prevent variable declaration errors
  'use strict';

  angular.module('app')
  .config(config);

  // dependencies are injected here, when placed in array it protects against minification
  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('home');

    $stateProvider
      .state('home', {
        url: '/home',
        views: {
          top: {
            templateUrl: 'app/nav/nav.html'
          },
          main: {
            templateUrl: 'app/home/home.html',
            controller: 'HomeCtrl'
          }
        }
      })
      .state('search', {
        url: '/search',
        views: {
          top: {
            templateUrl: 'app/nav/nav.html'
          },
          main: {
            templateUrl: 'app/search/search.html',
            controller: 'SearchCtrl'
          }
        },
      })
      // TODO: perhaps use URL params '/:username' to grab account details
      .state('user', {
        url: '/user',
        views: {
          top: {
            templateUrl: 'app/nav/nav.html'
          },
          main: {
            templateUrl: 'app/user/user.html',
            controller: 'UserCtrl'
          }
        }
      })
      // When you're linked to a unique id in a meal, we render the page
      .state('meal', {
        url: '/meals/:id',
        views: {
          top: {
            templateUrl: 'app/nav/nav.html'
          },
          main: {
            templateUrl: 'app/meal/meal.html',
            controller: 'MealCtrl'
          }
        }
      });
      // TODO: remove above semicolon to add more routes
  }

})();
