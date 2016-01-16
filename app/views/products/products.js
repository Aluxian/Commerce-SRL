(function(angular) {
  "use strict";

  var app = angular.module('myApp.products', ['firebase.auth', 'firebase', 'firebase.utils', 'ngRoute']);

  app.config(['$routeProvider', routeConfig]);

  app.controller('ProductsController', [ '$scope', 'fbutil', '$firebaseObject', '$firebaseArray', ProductsController ]);

  function routeConfig($routeProvider) {
    $routeProvider.when('/produse', {
      templateUrl: 'products/products.html',
      controller: 'ProductsController',
    });
  }

  function ProductsController($scope, fbutil, $firebaseObject, $firebaseArray) {
    $scope.searchReverse = false;
    $scope.products = $firebaseArray(fbutil.ref('products'));
    $scope.productsTitle = $firebaseObject(fbutil.ref('productsTitle'));
  }
})(angular);
