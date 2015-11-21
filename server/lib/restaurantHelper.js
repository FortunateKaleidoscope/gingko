var Promise = require('bluebird');
var db = require('../config/db.js');

module.exports = {
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
        url: restaurant.url
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
