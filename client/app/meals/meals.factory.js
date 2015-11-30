(function () {
  'use strict';

  angular.module('app')
  .factory('MealsFactory', MealsFactory);

  MealsFactory.$inject = ['$http'];

  function MealsFactory ($http) {
    var services = {
      getMealsByCity : getMealsByCity,
      getEvent : getEvent
    };

    return services;

    function getEvent (id) {
      return $http({
      method: 'GET',
      url: '/api/meals/' + id
      })
      .then(function (response) {
        console.log(response.data);
        return response.data;
      });
    }

    function getMealsByCity (city) {
      return $http({
      method: 'POST',
      url: '/api/meals/search/city',
      data: {searchTerm: city}
      })
      .then(function (response) {
        return response.data;
      });
    }
  }
})();
