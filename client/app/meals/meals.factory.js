(function () {
  'use strict';

  // var dummyImages = [
  //   'http://www.diningoutforlife.com/wp-content/uploads/2014/02/restaurant.jpg',
  //   'https://static4.businessinsider.com/image/536d34a4ecad046b153e69bc/15-etiquette-rules-for-dining-at-fancy-restaurants.jpg',
  //   "https://upload.wikimedia.org/wikipedia/commons/1/1e/Tom's_Restaurant,_NYC.jpg",
  //   "https://s3.amazonaws.com/stnd-narcissa-prod/graphics/assets/000/000/028/medium/narcissa_night_january_2014_cwmosier-1.jpg?1390860141",
  //   "http://civicneed.com/assets/images/upload/CompanyLogo/7798d0581940f24d73e1e1d7ea2f1302.jpg"
  // ];

  angular.module('app')
  .factory('MealsFactory', MealsFactory);

  MealsFactory.$inject = ['$http'];

  function MealsFactory ($http) {
    var services = {
      getMealsByCity : getMealsByCity,
      // dummyImages: dummyImages,
      getEvent : getEvent
    };

    return services;

    function getEvent (id) {
      return $http({
      method: 'GET',
      url: '/api/meals/' + id
      })
      .then(function (response) {
        console.log(response.data);
        return response.data;
      });
    }

    function getMealsByCity (city) {
      return $http({
      method: 'POST',
      url: '/api/meals/search/city',
      data: {searchTerm: city}
      })
      .then(function (response) {
        return response.data;
      });
    }
  }
})();
