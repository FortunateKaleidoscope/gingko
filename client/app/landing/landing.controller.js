(function () {
  'use strict';

  angular.module('app')
  .controller('LandingCtrl', LandingCtrl);

  LandingCtrl.$inject = ['$state'];

  function LandingCtrl ($state) {
    var self = this;
    self.search = function (searchTerm) {
      $state.go('meals', {searchTerm: searchTerm});
    };
  }

})();
