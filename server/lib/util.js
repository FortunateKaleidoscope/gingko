var db = require('../config/db');
exports.searchBy = {
  city: function (searchTerm) {
    return {
      include: [{
        model: db.Restaurants,
        where: {
          address: {
            $contains: searchTerm
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