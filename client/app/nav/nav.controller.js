(function () {
  angular.module('app')
  .controller('navCtrl', navCtrl);

  navCtrl.$inject = ["$state", "$stateParams", "$window", 'UserFactory'];

  function navCtrl ( $state, $stateParams, $window, UserFactory) {
    var self = this;
    self.isLoggedIn = function () {
      return UserFactory.getUser().username !== undefined;
    };

    self.search = function (searchTerm) {
      $state.go('meals', {searchTerm: searchTerm});
    };
    UserFactory.getUserInfo();
  }

})();
