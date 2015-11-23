(function () {
  'use strict';

  angular.module('app')
  .controller('MealsCtrl', MealsCtrl);

  // if factories are needed, inject here
  MealsCtrl.$inject = ["GoogleMapsFactory", 'MealsFactory', '$scope', '$state', "$location", "$window"];

  function MealsCtrl (GoogleMapsFactory, MealsFactory, $scope, $state) {
    var self = $scope;
    self.meals = [];
    self.markers = [];
    self.loaded = false;
    self.map;
    self.range = 0;
    var getLocation = GoogleMapsFactory.getLocation;
    var initMap = GoogleMapsFactory.initMap;
    var makeMarker = GoogleMapsFactory.makeMarker;
    var clearMarkers = GoogleMapsFactory.clearMarkers;
    var showMarkers = GoogleMapsFactory.showMarkers;

    self.mealMarkerBinder = function (meal) {
      meal.show = false;
      _.find(self.markers, function (marker) {
        return meal.id === marker.mealID;
      }).setMap(null);
    };


    self.getMeals = function () {
      MealsFactory.getMealsByCity($state.params.searchTerm)
      .then(function (data) {
        // Filter out bad data
        console.log(data);
        self.meals = data.map(function (meal) {
          self.range = Math.max(self.range, parseInt(meal.meal.maxAttendees));
          meal.show = true;
          return meal;
        });
        console.log('got meals');

        // pass getLocation the currentCity and a callback
        getLocation($state.params.searchTerm, function (result, status) {
          // create a map using initMap and set it to $scope.map
          self.map = initMap(document.getElementById('map'),
            // pass lat/lng to initMap
            result[0].geometry.location.lat(),
            result[0].geometry.location.lng());

          // Create markers by mapping over the meals and passing
          // makeMarker the map, lat/lng, and the meal title
          self.markers = self.meals.map(function (meal) {
            var marker = makeMarker(self.map,
              meal.meal.Restaurant.lat,
              meal.meal.Restaurant.lng,
              meal.meal.title);
            marker.mealID = meal.id;
            return marker;
          });
          // show the markers
          showMarkers(self.markers, self.map);
        });
      });
    };

    self.getMeals();
  }
})();
