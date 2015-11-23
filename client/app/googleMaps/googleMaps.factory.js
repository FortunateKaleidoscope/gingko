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

    // To clear the markers, pass each marker a null map
    function clearMarkers (markers) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
    }
    // To show markers, pass each created marker the created map
    function showMarkers (markers, map) {
      console.log(map);
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }

    // To make a marker, pass makeMarker the map, lat/lng, and info for the mouseover window
    // it will return a marker object which you can then push into an array
    // then pass it showMarkers to show the markers
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

    // Turns an address into a lat/lng object
    function getLocation (address, cb) {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({
        address: address
      }, function (results, status) {
        // results is an array of objects
          // results[0].geometry.location.lat() i think
        // TODO: Error handle with status
        cb(results, status);
      });
    }
    // pass initMap the domNode you want to turn into a map
    // along with the starting lat/lng
    function initMap (domNode, lat, lng) {
      var latlng = new google.maps.LatLng( lat, lng );
      var mapOptions = {
        zoom: 12,
        center: latlng
      };
      return new google.maps.Map(domNode, mapOptions);
    };


  }
})();
