angular.module('app.nav', [])
.controller('navCtrl', function ($scope, $state, $stateParams, $window) {
  $scope.search = function (searchTerm) {
    $state.go('meals', {searchTerm: searchTerm});
  };
});