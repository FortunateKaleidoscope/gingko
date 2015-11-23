// Placeholder for any sort of search factory
(function () {
  'use strict';

  angular.module('app')
  .factory('hostFactory', hostFactory);

  hostFactory.$inject = ['$http', '$window'];

  function hostFactory ($http, $window) {
    var services = {

      activate : activate,
      postMeal : postMeal

    };

    return services;

    function activate () {
      postMeal();
    }

    function postMeal (data) {
      console.log(data);
      return $http({
        method: 'POST',
        url: '/api/meals',
        data: data
      })
      .then(function (response) {
        console.log("successfully posted!");
        return response.data;
      });
    }
  }
})();
