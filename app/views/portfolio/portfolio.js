(function(angular) {
  "use strict";

  var app = angular.module('myApp.portfolio', []);

  app.config(['$routeProvider', routeConfig]);

  app.controller('PortfolioController', ['$scope', 'fbutil', '$firebaseObject', '$firebaseArray', PortfolioController]);

  function routeConfig($routeProvider) {
    $routeProvider.when('/proiecte', {
      templateUrl: 'portfolio/portfolio.html',
      controller: 'PortfolioController'
    });
  }

  function PortfolioController($scope, fbutil, $firebaseObject, $firebaseArray) {
    $scope.projects = $firebaseArray(fbutil.ref('projects'));
    $scope.projectsTitle = $firebaseObject(fbutil.ref('projectsTitle'));
  }
})(angular);
