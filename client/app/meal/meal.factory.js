(function () {
  'use strict';

  angular.module('app')
  .factory('MealFactory', MealFactory);

  // injecting in $http
  MealFactory.$inject = ['$http', '$location'];
  // you must do the same below
  function MealFactory($http, $location) {
    var services = {
      joinMeal: joinMeal
    };

    return services;

    function joinMeal(id) {
      return $http({
            method: 'POST',
            url: '/api/meals/' + id + '/join',
            data: {}
          })
          .then(function (response) {
            return response;
          });
      
    }
  }

})();
