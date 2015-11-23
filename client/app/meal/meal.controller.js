// This controller should handle the unique view of a meal page
// Example: http://localhost.com/#/meal/4 (should show the 4th meal)
(function () {
  'use strict';

  angular.module('app')
  .controller('MealCtrl', MealCtrl);

  MealCtrl.$inject = ['$http', '$location', '$window'];

  function MealCtrl ($http, $location, $window, Map) {
    var self = this;
    self.id = $location.path();
    self.data = null;
    self.joined = false;
    var map;
    self.joinMeal = function () {
      if (!self.joined) {
        return $http({
          method: 'POST',
          url: '/api' + $location.path() + '/join',
          data: {}
        })
        .then(function (response) {
          self.joined = true;
          self.getMeal();
        });
      }
    };
    self.activate = function () {
      self.getMeal();
    };
    self.getMeal = function () {
      var path = '/api';
      console.log('Getting users from DB, path is: ', path + $location.path());
      return $http({
        method: 'GET',
        url: path + $location.path()
      })
      .then(function (response) {
        self.data = response.data;
        //Checks if there are any spots available at table
        if (self.data.attending.length >= self.data.meal.maxAttendees || moment(self.data.meal.date).isBefore(moment())) {
          //if so disable button
          self.joined = true;
        }
        self.eventPassed = moment(self.data.meal.date).isBefore(moment());
        self.timeToMeal = moment(self.data.meal.date).fromNow();
        self.data.meal.date = moment(self.data.meal.date).calendar();
        var mapCanvas = document.getElementById('map');

        var myLatLng = {
          lat: self.data.meal.Restaurant.lat,
          lng: self.data.meal.Restaurant.lng
        };

        var mapOptions = {
          center: new google.maps.LatLng(self.data.meal.Restaurant.lat, self.data.meal.Restaurant.lng),
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(mapCanvas, mapOptions);

        var marker = new google.maps.Marker({
          position: myLatLng,
          title: "hello world!"
        });

        marker.setMap(map);

      });
    };
    self.activate();
  }
})();
