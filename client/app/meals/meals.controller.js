(function () {
  'use strict';

  angular.module('app')
  .controller('MealsCtrl', MealsCtrl);

  // if factories are needed, inject here
  MealsCtrl.$inject = ['MealsFactory', '$scope', '$state', "$location", "$window"];


  function MealsCtrl (MealsFactory, $scope, $state, $location, $window) {
    var self = $scope;

    self.getMeals = function () {
      MealsFactory.getMeals()
      .then(function (data) {
        console.log(Object.keys(data[0]));
        self.meals = data;
      });
    };

    self.routeToEvent = function (id) {
      homeFactory.getEvent(id)
      .then(function (data) {
        $window.location.href = "/#/meals/" + id;
      });
    };

    self.meals = [];

    self.getMeals();
  }
})();
