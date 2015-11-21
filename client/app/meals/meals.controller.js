(function () {
  'use strict';

  angular.module('app')
  .controller('HomeCtrl', HomeCtrl);

  // if factories are needed, inject here
  HomeCtrl.$inject = ['homeFactory', '$state', "$location", "$window"];

  function HomeCtrl (homeFactory, $state, $location, $window) {
    var self = this;
    self.getData = function () {
      homeFactory.getMeals()
      .then(function (data) {
        self.events = data;
      });
    };
    self.routeToEvent = function (id) {
      homeFactory.getEvent(id)
      .then(function (data) {
        $window.location.href = "/#/meals/" + id;
      });
    };

    self.events = [];

    self.getData();
  }
})();
