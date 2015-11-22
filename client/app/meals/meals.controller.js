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
      // TODO: instead of getMeals, calling it getMealsBySearchTerm
      MealsFactory.getMeals()
      .then(function (data) {
        // Filter out bad data
        self.meals = _.filter(data, function (meal) {
          return meal.restaurant !== null;
        }).map(function (meal) {
          // TODO: Dummy Images
          meal.meal.img = images[Math.floor(Math.random() * images.length)];
          return meal;
        });

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
            return makeMarker(self.map,
              meal.restaurant.lat,
              meal.restaurant.lng,
              meal.meal.title);
          });
          // show the markers
          showMarkers(self.markers, self.map);
        });
      });
    };
    
    self.getMeals();
  }
})();
