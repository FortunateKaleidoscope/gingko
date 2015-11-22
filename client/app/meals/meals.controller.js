(function () {
  'use strict';

  angular.module('app')
  .controller('MealsCtrl', MealsCtrl);

  // if factories are needed, inject here
  MealsCtrl.$inject = ["GoogleMapsFactory", 'MealsFactory', '$scope', '$state', "$location", "$window"];


  function MealsCtrl (GoogleMapsFactory, MealsFactory, $scope, $state, $location, $window) {
    var images = [
      'http://www.diningoutforlife.com/wp-content/uploads/2014/02/restaurant.jpg',
      'https://static4.businessinsider.com/image/536d34a4ecad046b153e69bc/15-etiquette-rules-for-dining-at-fancy-restaurants.jpg',
      "https://upload.wikimedia.org/wikipedia/commons/1/1e/Tom's_Restaurant,_NYC.jpg",
      "https://s3.amazonaws.com/stnd-narcissa-prod/graphics/assets/000/000/028/medium/narcissa_night_january_2014_cwmosier-1.jpg?1390860141",
      "http://civicneed.com/assets/images/upload/CompanyLogo/7798d0581940f24d73e1e1d7ea2f1302.jpg"
    ];

    var self = $scope;
    self.meals = [];
    self.loaded = false;
    self.map;

    // var getLocation = function (address, cb) {
    //   var geocoder = new google.maps.Geocoder();
    //   geocoder.geocode({
    //     address: address
    //   }, function (result, status) {
    //     cb(result, status);
    //   });
    // }
    //
    // var initMap = function(domNode, lat, lng) {
    //   var latlng = new google.maps.LatLng( lat, lng );//sets to San Francisco by default
    //   var mapOptions = {
    //     zoom: 12,
    //     center: latlng
    //   }
    //   return new google.maps.Map(domNode, mapOptions);
    // };
    //
    var getLocation = GoogleMapsFactory.getLocation;
    var initMap = GoogleMapsFactory.initMap;


    self.getMeals = function () {
      MealsFactory.getMeals()
      .then(function (data) {
        self.meals = data.map(function (r) {
          r.meal.img = images[Math.floor(Math.random() * images.length)];
          return r;
        });
        getLocation($state.params.searchTerm, function (result, status) {
          self.map = initMap(document.getElementById('map'),
            result[0].geometry.location.lat(),
            result[0].geometry.location.lng());
        });
      });
    };



    self.routeToEvent = function (id) {
      homeFactory.getEvent(id)
      .then(function (data) {
        $window.location.href = "/#/meals/" + id;
      });
    };


    self.getMeals();
  }
})();
