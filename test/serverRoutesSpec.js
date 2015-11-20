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
  it('should get /api/meals', function (done) {
    request(app)
      .get('/api/meals')
      .expect(200, done);
  });
  it('should post /api/meals', function (done) {
    request(app)
      .post('/api/meals')
      .send(meal)
      .expect(200, done);
  });
  it('should get /api/meals/1', function (done) {
    request(app)
      .get('/api/meals/1')
      .expect(200, done);
  });
  it('should get /api/meals/1', function (done) {
    request(app)
      .post('/api/meals/1')
      .send({facebookId: 232424232})
      .expect(200, done);
  });
  it('should get /api/users', function (done) {
    request(app)
      .get('/api/users')
      .expect(200, done);
  });
  it('should get /api/users/1', function (done) {
    request(app)
      .get('/api/users/1')
      .expect(200, done);
  });
  it('should route to /api/auth/login', function (done) {
    request(app)
      .get('/api/auth/login')
      .expect(302, done);
  });
  it('should route to /api/auth/login/callback', function (done) {
    request(app)
      .get('/api/auth/login/callback')
      .expect(302, done);
  });
  it('should 404', function (done) {
    request(app)
      .get('/dasfsad')
      .expect(404, done);
  });
  it('should route to /api/yelp', function (done) {
    request(app)
      .get('/api/yelp?term=hello') // This takes a param
      .expect(200, done);
  });
  it('should route to /api/googleMaps', function (done) {
    request(app)
      .get('/api/googleMaps')
      .expect(200, done);
  });

  xit('should route to a user\'s open table', function (done) {
    request(app)
      .get('/api/users/1/opentable')
      .expect(200, done);
  });
  xit('should take a post request to an opentable', function (done) {
    request(app)
      .post('/api/opentable')
      .expect(200, done);
  });
});
