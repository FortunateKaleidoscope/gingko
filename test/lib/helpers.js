var Sequelize = require('sequelize');
module.exports = {
  clearTable: function (model, done) {
    var sequelize = new Sequelize("tablesurfer", "admin", "admin", {
      dialect: "postgres",
      port: 5432
    });
    model.findAll().then(function (users) {
      return Promise.map(users, function (user) {
        return user.destroy();
      });
    }).then(function () {
      sequelize.sync({force: true})
      .then( function () {
        done();
      });
    });
  }
};
