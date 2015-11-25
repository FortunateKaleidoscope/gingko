(function () {
  'use strict';

  angular.module('app')
  .controller('HostCtrl', HostCtrl);

  HostCtrl.$inject = ['$http', '$q', '$log', '$window', 'hostFactory', 'UserFactory', 'MealFactory'];

  function HostCtrl ($http, $q, $log, $window, hostFactory, UserFactory, MealFactory) {
    var self = this;

    // Range of max attendees for ng-repeat
    self.maxAttendees = [1,2,3,4,5,6,7,8];

    // Initializing max selected to false
    self.maxSelected = false;

    // Checks to see if number provided matches max selected
    self.isSelected = function (num) {
      return self.maxSelected === num;
    };

    // Sets max attendees for meal, used to put toggled class on element
    self.toggleMax = function (num) {
      self.maxSelected = num;
      self.meal.maxAttendees = num;
    };
    // Reads user from local storage
    self.user = UserFactory.getUser().username;

    // Initialization of meal object
    self.meal = {
        username: self.user
    };
    // Checks to see if all required fields are filled out, returns boolean
    self.isValidMeal = function () {
      return ( !self.maxSelected || self.selectedItem === undefined || self.meal.title === '' || self.meal.description === '' || self.meal.date === '' || self.time === '');
    };

    // self.attendees = null;
    // Initialize selected item to undefined
    self.selectedItem = undefined;

    // Sets selected item to restaurant object
    self.selectRestaurant = function (restaurant) {
        self.selectedItem = restaurant;
        // closes dropdown
        self.popout = false;
    };
    self.search = function () {
      //Only does search if search box has more than 0 characters
      if (self.searchEntry.length > 0) {
        // opens dropdown
        self.popout = true;
        // runs search query
        self.querySearch(self.searchEntry);
      } else {
        // closes dropdown
        self.popout = false;
      }
    };
    self.querySearch = function (query) {
      var path = '/api/yelp';

      return $http({
        url: path + '?term=' + query,
        method: 'GET'
      }).
        then(function (response) {
          self.status = response.status;
          self.iteratee = response.data;
          self.data = [];
          _.each(self.iteratee, function (item) {
            if (!item.is_closed && item.rating && item.name && item.url && item.categories && item.phone && item.location) {
              self.data.push({
                'rating': item.rating,
                'name': item.name,
                'url': item.url,
                'imgUrl': item.image_url,
                'categories': item.categories[0][0],
                'phone': item.phone,
                'display_address': item.location.display_address,
                'city': item.location.city,
                'zipCode': item.location.postal_code,
                'coordinate': {
                  lat: item.location.coordinate.latitude,
                  lng: item.location.coordinate.longitude
                }
              });
            }
          });
        }, function (response) {
          self.data = response.data || "Request failed";
          self.status = response.status;
          console.log('Error during querySearch.');
        })
        .then(function (response) {
          return self.data;
        });

    };
    // Converts time from picker to ISO string
    self.formatTime = function (date, time) {
      var result = date + ',' + time;
      //saves it into meal object
      self.meal.date = moment(result).toISOString();
    };

    self.add = function () {
      // Checks if all fields are provided
      if (!self.isValidMeal()) {
        //sets the restaurant onto meal object
        self.meal.restaurant = self.selectedItem;
        //includes user object
        self.meal.user = UserFactory.getUser();
        //formats time into ISO string
        self.formatTime(self.meal.date, self.time);

        hostFactory.postMeal(self.meal)
        .then(function (response) {
          // Has host attend meal automatically
          MealFactory.joinMeal(response.id);
          // Redirects to meal detail page of new meal
          $window.location = '/#/meals/' + response.id;
        });
      }
    };
}
})();
