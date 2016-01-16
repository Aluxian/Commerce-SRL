(function(angular) {
  "use strict";

  var app = angular.module('myApp.footer', ['firebase', 'firebase.utils']);

  app.controller('FooterController', ['$scope', '$location', 'Auth', 'fbutil', '$firebaseObject', FooterController]);

  function FooterController($scope, $location, Auth, fbutil, $firebaseObject) {
    var options = $firebaseObject(fbutil.ref('options'));

    options.$bindTo($scope, 'options');
  }
})(angular);
