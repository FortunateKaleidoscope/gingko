(function () {
  'use strict';

  angular.module('app')
  .factory('MealsFactory', MealsFactory);

  MealsFactory.$inject = ['$http'];

  function MealsFactory ($http) {
    var services = {
      getMeals : getMeals,
      getEvent : getEvent
    };

    return services;

    function getEvent (id) {
      console.log("id", id);
      return $http({
      method: 'GET',
      url: '/api/meals/' + id
      })
      .then(function (response) {
        console.log(response.data);
        return response.data;
      });
    }

    function getMeals () {
      return $http({
      method: 'GET',
      url: '/api/meals'
      })
      .then(function (response) {
        return response.data;
      });
    }
  }
})();
