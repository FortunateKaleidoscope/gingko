(function () {
  'use strict';

  angular.module('app')
  .controller('MealsCtrl', MealsCtrl);

  // if factories are needed, inject here
  MealsCtrl.$inject = ['MealsFactory', '$scope', '$state', "$location", "$window", "uiGmapGoogleMapApi"];


  function MealsCtrl (MealsFactory, $scope, $state, $location, $window, uiGmapGoogleMapApi) {
    var images = [
      'http://www.diningoutforlife.com/wp-content/uploads/2014/02/restaurant.jpg',
      'https://static4.businessinsider.com/image/536d34a4ecad046b153e69bc/15-etiquette-rules-for-dining-at-fancy-restaurants.jpg',
      "https://upload.wikimedia.org/wikipedia/commons/1/1e/Tom's_Restaurant,_NYC.jpg",
      "https://s3.amazonaws.com/stnd-narcissa-prod/graphics/assets/000/000/028/medium/narcissa_night_january_2014_cwmosier-1.jpg?1390860141",
      "http://civicneed.com/assets/images/upload/CompanyLogo/7798d0581940f24d73e1e1d7ea2f1302.jpg"
    ];
    var self = $scope;
    self.meals = [];
    uiGmapGoogleMapApi.then(function (maps) {
      self.map = {
        center: {
          latitude: 45,
          longitude: -73
        },
        zoom: 8
      };
      maps;
    });

    self.getMeals = function () {
      MealsFactory.getMeals()
      .then(function (data) {
        self.meals = data.map(function (r) {
          r.meal.img = images[Math.floor(Math.random() * images.length)];
          return r;
        });
        console.log(self.meals);
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
