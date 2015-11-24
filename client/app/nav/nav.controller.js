(function () {
  angular.module('app')
  .controller('navCtrl', navCtrl);

  navCtrl.$inject = ["$scope", "$state", "$stateParams", "$window", 'UserFactory'];

  function navCtrl ($scope, $state, $stateParams, $window, UserFactory) {
    var self = $scope;
    self.search = function (searchTerm) {
      $state.go('meals', {searchTerm: searchTerm});
    };
    UserFactory.getUserInfo();
  }

})();
