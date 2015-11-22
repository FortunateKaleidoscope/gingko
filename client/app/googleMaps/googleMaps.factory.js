(function () {
  'use strict';

  angular.module('app')
  .factory('GoogleMapsFactory', GoogleMapsFactory);

  GoogleMapsFactory.$inject = [];

  function GoogleMapsFactory () {
    var services = {
      getLocation : getLocation,
      initMap: initMap
    };

    return services;

    function getLocation (address, cb) {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({
        address: address
      }, function (result, status) {
        cb(result, status);
      });
    }
    function initMap (domNode, lat, lng) {
      var latlng = new google.maps.LatLng( lat, lng );//sets to San Francisco by default
      var mapOptions = {
        zoom: 12,
        center: latlng
      };
      return new google.maps.Map(domNode, mapOptions);
    };


  }
})();
