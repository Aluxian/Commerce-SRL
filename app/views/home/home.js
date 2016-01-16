(function(angular) {
  "use strict";

  var app = angular.module('myApp.home', ['firebase.auth', 'firebase', 'firebase.utils', 'ngRoute']);

  app.controller('HomeCtrl', ['$scope', '$location', 'fbutil', 'user', '$firebaseObject', '$firebaseArray', 'FBURL', function($scope, $location, fbutil, user, $firebaseObject, $firebaseArray, FBURL) {
    $scope.user = user;
    $scope.FBURL = FBURL;

    $scope.services = $firebaseArray(fbutil.ref('services'));
    $scope.servicesTitle = $firebaseObject(fbutil.ref('servicesTitle'));
    $scope.projects = $firebaseArray(fbutil.ref('projects'));
    $scope.projectsTitle = $firebaseObject(fbutil.ref('projectsTitle'));
    $scope.principles = $firebaseArray(fbutil.ref('principles'));
    $scope.principlesTitle = $firebaseObject(fbutil.ref('principlesTitle'));
    $scope.members = $firebaseArray(fbutil.ref('members'));
    $scope.membersTitle = $firebaseObject(fbutil.ref('membersTitle'));
    $scope.testimonials = $firebaseArray(fbutil.ref('testimonials'));
    $scope.testimonialsTitle = $firebaseObject(fbutil.ref('testimonialsTitle'));
    $scope.testimonialsInterval = 5000;
    $scope.team = $firebaseArray(fbutil.ref('team'));
    $scope.teamTitle = $firebaseObject(fbutil.ref('teamTitle'));
    $scope.processes = $firebaseArray(fbutil.ref('processes'));
    $scope.processesTitle = $firebaseObject(fbutil.ref('processesTitle'));

    $scope.findMore = function() {
      console.log('find more');
      $('html, body').animate({scrollTop: 830}, 300);
    };

    $scope.goTo = function(url) {
      $location.path(url);
    };
  }]);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'home/home.html',
      controller: 'HomeCtrl',
      resolve: {
        user: ['Auth', function(Auth) {
          return Auth.$waitForAuth();
        }]
      }
    }).otherwise({
      redirectTo: '/home'
    });
  }]);

})(angular);
