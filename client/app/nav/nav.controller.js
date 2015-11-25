(function () {
  angular.module('app')
  .controller('navCtrl', navCtrl);

  navCtrl.$inject = ["$state", "$stateParams", "$window", 'UserFactory'];

  function navCtrl ( $state, $stateParams, $window, UserFactory) {
    var self = this;

    // Returns boolean concerning user logged status, used in conditional formatting
    self.isLoggedIn = function () {
      self.user = UserFactory.getUser();
      return UserFactory.isLoggedIn();
    };

    self.search = function (searchTerm) {
      $state.go('meals', {searchTerm: searchTerm});
    };
    UserFactory.getUserInfo();
  }

})();
