(function(angular) {
  "use strict";

  var app = angular.module('myApp.partners', []);

  app.config(['$routeProvider', routeConfig]);

  app.controller('PartnersController', ['$scope', 'fbutil', '$firebaseObject', '$firebaseArray', PartnersController]);

  function routeConfig($routeProvider) {
    $routeProvider.when('/parteneri', {
      templateUrl: 'partners/partners.html',
      controller: 'PartnersController'
    });
  }

  function PartnersController($scope, fbutil, $firebaseObject, $firebaseArray) {
    $scope.partners = $firebaseArray(fbutil.ref('partners'));
    $scope.partnersTitle = $firebaseObject(fbutil.ref('partnersTitle'));
  }
})(angular);
