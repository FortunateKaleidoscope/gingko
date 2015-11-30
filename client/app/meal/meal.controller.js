// This controller should handle the unique view of a meal page
// Example: http://localhost.com/#/meal/4 (should show the 4th meal)
(function () {
  'use strict';

  angular.module('app')
  .controller('MealCtrl', MealCtrl);

  MealCtrl.$inject = ['$http', '$location', '$window', 'UserFactory', 'MealFactory'];

  function MealCtrl ($http, $location, $window, UserFactory, MealFactory) {
    var self = this;
    self.data = null;

    //initialiazes join flag and join button text
    self.joined = false;
    self.joinText = "Join Table";

    self.user = UserFactory.getUser();

    var map;

    self.joinMeal = function (id) {
      // Only joins meal if flag is false
      if (!self.joined) {
        MealFactory.joinMeal(id)
        .then(function () {
          // toggle flag and reload view
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
        //check if user is already attending
        self.data.attending.forEach(function (attendee) {
          if ( attendee.username === self.user.username ) {
            //prevents user from joining
            self.joinText = "You Have Already Joined";
            self.joined = true;
          }
        });
        // If not logged in, cannot join table
        if ( !UserFactory.isLoggedIn() ) {
          self.joinText = "Log In to Join Table";
          self.joined = true;
        }

        //Checks if there are any spots available at table
        if (self.data.attending.length >= self.data.meal.maxAttendees || moment(self.data.meal.date).isBefore(moment())) {
          //if not, disables button
          self.joined = true;
        }
        // Time formating
        self.eventPassed = moment(self.data.meal.date).isBefore(moment()); //If meal already happened, set to true
        self.timeToMeal = moment(self.data.meal.date).fromNow(); //display time to meal in understandable language
        self.data.meal.date = moment(self.data.meal.date).calendar(); //display time of meal

        if (self.eventPassed) {
          self.joinText = "Table Already Happened";
        }

        // Google map drawing and placing of marker based on lat and lng from Yelp
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
