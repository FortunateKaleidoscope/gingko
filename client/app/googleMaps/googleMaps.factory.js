(function () {
  'use strict';

  angular.module('app')
  .factory('GoogleMapsFactory', GoogleMapsFactory);

  GoogleMapsFactory.$inject = [];

  function GoogleMapsFactory () {
    var services = {
      getLocation : getLocation,
      initMap: initMap,

      clearMarkers: clearMarkers,
      showMarkers: showMarkers,
      makeMarker: makeMarker
    };
    return services;

    function clearMarkers (markers) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
    }

    function showMarkers (markers, map) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }

    function makeMarker (map, lat, lng, info) {
      var myLatLng = new google.maps.LatLng(lat, lng);
      var infowindow = new google.maps.InfoWindow({
          content: info
      });
      var marker = new google.maps.Marker({
          position: myLatLng,
          animation: google.maps.Animation.DROP
      });
      google.maps.event.addListener(marker, 'mouseover', function () {
          infowindow.open(map, marker);
      });
      google.maps.event.addListener(marker, 'mouseout', function () {
          infowindow.close(map, marker);
      });
      return marker;
    };

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
