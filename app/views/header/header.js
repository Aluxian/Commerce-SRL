(function(angular) {
  "use strict";

  var app = angular.module('myApp.header', ['ngRoute', 'firebase', 'firebase.utils']);

  app.controller('HeaderController', ['$rootScope', '$scope', '$location', 'Auth', 'fbutil', '$firebaseObject', HeaderController]);

  function HeaderController($rootScope, $scope, $location, Auth, fbutil, $firebaseObject) {
    var options = $firebaseObject(fbutil.ref('options'));

    options.$bindTo($scope, 'options');

    $scope.routeActive = routeActive;
    $scope.logout = logout;

    function routeActive(route) {
      return $location.path() == route ? 'active' : '';
    }

    function logout() {
      Auth.$unauth();
      $rootScope.user = undefined;
      $rootScope.loggedIn = false;
      $location.path('/login');
    }
  }
})(angular);
