// (function () {
//   'use strict';
//
//   angular.module('app')
//   .factory('homeFactory', homeFactory);
//
//   // injecting in $http
//   homeFactory.$inject = ['$http', '$location'];
//   // you must do the same below
//   function homeFactory($http, $location) {
//     var services = {
//       getMeal: getMeal
//     };
//
//     return services;
//
//     getMeal();
//
//     function getMeal(cb) {
//       var path = '/api/users/1';
//       return $http({
//         url: path,
//         method: 'GET'
//       })
//       .then(function(response) {
//         console.log('Get users data is here, resp.data: ', response.data);
//         cb(response.data);
//       });
//     }
//   }
//
// })();
