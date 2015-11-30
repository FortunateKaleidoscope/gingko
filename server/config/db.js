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
  var db = new Sequelize("tablesurfer", "admin", "admin", {
    dialect: "postgres", // or 'sqlite', mysql', 'mariadb'
    port: 5432,
    logging: false //(for postgres)
  });
}

var Users = db.define("Users", {
  //here we will have to figure out the data from facebook on authentication
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

//users should hasmany meals ?
//change this later
// Player.belongsTo(Team); // Will add a TeamId attribute to Player to hold the primary key value for Team
Users.hasMany(Meals);
Meals.belongsTo(Users);


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
  // TODO: Create categories
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

//this creates restaurant foreign key for meal
//this is also wrong
Restaurants.hasMany(Meals);
Meals.belongsTo(Restaurants);
/**
  *
  *
  *  ¯\_(ツ)_/¯ - Is this the correct way to do associations?
  *
  *
  */
// Meals.hasOne(Restaurants);

var Attendees = db.define("Attendees", {
});

Users.belongsToMany(Meals, { through: 'Attendees' });
Meals.belongsToMany(Users, { through: 'Attendees' });


//Lauren's followers table
Users.belongsToMany(Users, {
  as: 'Followers',
  through: 'Followers_join'
});

db.sync();

exports.Meals = Meals;
exports.Users = Users;
exports.Restaurants = Restaurants;
exports.Attendees = Attendees;
