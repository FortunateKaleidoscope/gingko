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
    self.genre = '';
    self.map;
    self.range = 0;
    var getLocation = GoogleMapsFactory.getLocation;
    var initMap = GoogleMapsFactory.initMap;
    var makeMarker = GoogleMapsFactory.makeMarker;
    var clearMarkers = GoogleMapsFactory.clearMarkers;
    var showMarkers = GoogleMapsFactory.showMarkers;

    var mealMarkerBinder = function (meal) {
      meal.show = true;
      _.find(self.markers, function (marker) {
        return meal.meal.id === marker.mealID;
      }).setMap(self.map);
    };

    var filters = function (filterObj) {
      var re = new RegExp(filterObj.val, 'gi');
      var filterFunc = {
        attendees: function (meal) {
          return meal.meal.maxAttendees >= filterObj.val;
        },
        genre: function (meal) {
          console.log(meal.meal.Restaurant.categories.match(re));
          return meal.meal.Restaurant.categories.match(re);
        }
      };
      return filterFunc[filterObj.filterBy];
    };

    self.hideCards = function () {
      self.meals.forEach(function (meal) {
        meal.show = false;
      });
    };

    self.showCards = function () {
      self.meals.forEach(function (meal) {
        meal.show = true;
      });
    };

    self.filterBy = function (filterObj) {
      self.hideCards();
      clearMarkers(self.markers);
      _.filter(self.meals, filters(filterObj)).forEach(function (meal) {
        mealMarkerBinder(meal);
      });
    };

    self.filterByGenre = function () {
      self.filterBy({
        filterBy: 'genre',
        val: self.genre
      });
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

            marker.mealID = meal.meal.id;
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
