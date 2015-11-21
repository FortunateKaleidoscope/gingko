var db = require('../config/db');
exports.searchBy = {
  city: function (searchTerm) {
    searchTerm = searchTerm.toString();
    return {
      include: [{
        model: db.Restaurants,
        where: {
          address: {
            $iLike: 'test'
            }
          }
      },
        db.Users
      ]
    };
  },
  time: function (searchArr) {

  },
  genre: function (searchTerm) {

  }
};