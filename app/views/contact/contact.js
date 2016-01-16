(function(angular) {
  "use strict";

  var app = angular.module('myApp.contact', ['firebase', 'firebase.utils', 'ngRoute']);

  app.config(['$routeProvider', routeConfig]);

  app.controller('ContactController', ['$scope', '$sce', 'fbutil', '$firebaseObject', ContactController]);

  function routeConfig($routeProvider) {
    $routeProvider.when('/contact', {
      templateUrl: 'contact/contact.html',
      controller: 'ContactController'
    });
  }

  function ContactController($scope, $sce, fbutil, $firebaseObject) {
    var options = $firebaseObject(fbutil.ref('options'));

    options.$bindTo($scope, 'options');

    $scope.mapUrl = "";

    $scope.$watch('options', updateMap);

    function updateMap(newVal) {
      if (!newVal) return;

      $scope.mapUrl = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDP88grPhbFZwRD9_5THnLBXP5IFvBERkk&q=" + encodeURIComponent($scope.options.address);

      $scope.mapUrl = $sce.trustAsResourceUrl($scope.mapUrl);
    }
  }
})(angular);
