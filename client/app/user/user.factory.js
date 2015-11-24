(function () {
  angular.module('app')
  .factory('UserFactory', UserFactory);

  UserFactory.$inject = ["$http"];

  function UserFactory ($http) {
    var services = {
      // makes call to /auth/user to get req.user
      // stores it to localStorage
      // also returns data as promise
      getUserInfo: getUserInfo,
      // returns object from localStorage
      getUser: getUser
    };
    return services;

    function getUser () {
      return JSON.parse(localStorage.getItem('user'));
    }

    function getUserInfo () {
      return $http({
        url: '/auth/user'
      }).then(function (data) {
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data.data));
        return data;
      });
    }
  }

})();
