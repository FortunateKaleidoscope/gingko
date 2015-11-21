angular.module('app.nav', [])
.controller('navCtrl', function ($scope, $window) {
  $scope.logout = function () {
    $window.location.href = '/auth/logout';
  };
  $scope.login = function () {
    $window.location.href = '/auth/login';
  };
});