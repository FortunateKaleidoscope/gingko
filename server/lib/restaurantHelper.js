var Promise = require('bluebird');
var db = require('../config/db.js');

module.exports = {
  // Takes a restaurant object and does a findOrCreate
  findOrCreate: function (restaurant) {
    return db.Restaurants.findOrCreate({
      where: {
        name: restaurant.name,
        address: restaurant.display_address,
        city: restaurant.city,
        zipCode: restaurant.zipCode,
        contact: restaurant.phone,
        rating: restaurant.rating.toString(),
        lat: restaurant.coordinate.lat,
        lng: restaurant.coordinate.lng,
        url: restaurant.url,
        // yelp hands back a url for a small picture
        // by slicing off ms.jpg, we can specify what size image we want
        // on the client side
        imgUrl: restaurant.imgUrl.replace('ms.jpg', ''),
        categories: restaurant.categories
      }
    })
    .spread(function (restaurant) {
      return restaurant;
    })
    .catch(function (err) {
      console.log('error making restaurant');
    });
  }
};
