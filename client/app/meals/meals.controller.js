(function () {
  'use strict';

  angular.module('app')
  .controller('MealsCtrl', MealsCtrl);

  // if factories are needed, inject here
  MealsCtrl.$inject = ["GoogleMapsFactory", 'MealsFactory', '$scope', '$state', "$location", "$window"];


  function MealsCtrl (GoogleMapsFactory, MealsFactory, $scope, $state) {
    var images = MealsFactory.dummyImages;
    var self = $scope;
    self.meals = [];
    self.markers = [];
    self.loaded = false;
    self.map;
    var getLocation = GoogleMapsFactory.getLocation;
    var initMap = GoogleMapsFactory.initMap;
    var makeMarker = GoogleMapsFactory.makeMarker;
    var clearMarkers = GoogleMapsFactory.clearMarkers;
    var showMarkers = GoogleMapsFactory.showMarkers;


    self.getMeals = function () {
      MealsFactory.getMeals()
      .then(function (data) {
        self.meals = _.filter(data, function (meal) {
          return meal.restaurant !== null;
        }).map(function (meal) {
          meal.meal.img = images[Math.floor(Math.random() * images.length)];
          return meal;
        });

        getLocation($state.params.searchTerm, function (result, status) {
          self.map = initMap(document.getElementById('map'),
            result[0].geometry.location.lat(),
            result[0].geometry.location.lng());

          self.markers = self.meals.map(function (meal) {
            return makeMarker(self.map,
              meal.restaurant.lat,
              meal.restaurant.lng,
              meal.meal.title);
          });

          showMarkers(self.markers, self.map);
        });
      });
    };
    self.getMeals();
  }
})();
