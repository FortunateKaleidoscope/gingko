var Sequelize = require("sequelize");

//Unsure if we need password, come back to this
if ( process.env['DATABASE_URL'] !== undefined ) {
  //Heroku settings
  var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
  var db = new Sequelize(match[5], match[1], match[2], {
    dialect: 'postgres',
    protocol: 'postgres',
    port: match[4],
    host: match[3],
    logging: false
  });
} else {
  var db = new Sequelize("tablesurfer", 'admin', 'admin', {
    dialect: "postgres", // or 'sqlite', mysql', 'mariadb'
    port: 5432,
    logging: false //(for postgres)
  });
}

// Stores data from facebook
var Users = db.define("Users", {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  facebookId: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

var Meals = db.define("Meals", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  maxAttendees: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// A user can have many meals
// a meal can only have one host
Users.hasMany(Meals);
Meals.belongsTo(Users);

// Stores the restaurant data in db
var Restaurants = db.define("Restaurants", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING,
    allowNull: true
  },
  rating: {
    type: Sequelize.STRING,
    allowNull: true
  },
  address: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },
  categories: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imgUrl: Sequelize.STRING,
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zipCode: {
    type: Sequelize.STRING,
    allowNull: false
  },
  contact: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lat: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  lng: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
});

// A restaurant can have many Meals
// A meal can only have one Restaurant
Restaurants.hasMany(Meals);
Meals.belongsTo(Restaurants);

// Join table
var Attendees = db.define("Attendees", {
});

// Users can have many meals
// Meals can have many users
// Connects it through attendees
Users.belongsToMany(Meals, { through: 'Attendees' });
Meals.belongsToMany(Users, { through: 'Attendees' });

db.sync();

exports.Meals = Meals;
exports.Users = Users;
exports.Restaurants = Restaurants;
exports.Attendees = Attendees;
