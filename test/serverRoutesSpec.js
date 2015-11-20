var Promise = require('bluebird');
var request = require('supertest');
var expect = require('chai').expect;
var app = require('../server/server-config');

xdescribe("Routes to /api/in", function () {

  var meal = {
    username: "Bob",
    title: "Bob's burgers",
    date: Date.now(),
    time: Date.now(),
    description: "A Delicious Meal",
    restaurant: {
      name: "Bobs restaurant down the street",
      display_address: "123 fake st.",
      phone: "555 555 5555",
      coordinate: {
        lat: 123,
        lng: 323
      }
    }
  };

  var user = {
    firstName: "Yilen",
    lastName: "Pan",
    facebookId: 3124242343453345
  };


  it('should route to the root folder', function (done) {
    request(app)
      .get('/')
      .expect(200, done);
  });
  it('should get /api/in/meals', function (done) {
    request(app)
      .get('/api/in/meals')
      .expect(200, done);
  });
  it('should post /api/in/meals', function (done) {
    request(app)
      .post('/api/in/meals')
      .send(meal)
      .expect(200, done);
  });
  it('should get /api/in/meals/1', function (done) {
    request(app)
      .get('/api/in/meals/1')
      .expect(200, done);
  });
  it('should get /api/in/user', function (done) {
    request(app)
      .get('/api/in/user')
      .expect(200, done);
  });
  it('should get /api/in/user/1', function (done) {
    request(app)
      .get('/api/in/user/1')
      .expect(200, done);
  });
  it('should post to /api/in/user', function (done) {
    request(app)
      .post('/api/in/user')
      .send(user)
      .expect(200, done);
  });
});
