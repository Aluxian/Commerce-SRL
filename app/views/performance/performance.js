(function(angular) {
  "use strict";

  var app = angular.module('myApp.performance', []);

  app.config(['$routeProvider', routeConfig]);

  app.controller('PerformanceController', ['$scope', 'fbutil', '$firebaseObject', '$firebaseArray', PerformanceController]);

  function routeConfig($routeProvider) {
    $routeProvider.when('/performanta', {
      templateUrl: 'performance/performance.html',
      controller: 'PerformanceController'
    });
  }

  function PerformanceController($scope, fbutil, $firebaseObject, $firebaseArray) {
    // $scope.partners = $firebaseArray(fbutil.ref('partners'));
    // $scope.partnersTitle = $firebaseObject(fbutil.ref('partnersTitle'));

    $scope.graphs = [{
      alignLeft: true,
      title: 'Numar clienti multumiti',
      description: 'In fiecare an ne straduim sa avem cat mai multi clienti. Dar numarul lor nu este singurul lucru care conteaza pentru noi, ci si gradul lor de satisfactie. Departamenul nostru de suport are grija de fiecare client in parte.',
      labels: ['2012', '2013', '2014', '2015'],
      data: [
        [10, 12, 13, 18]
      ]
    },{
      alignLeft: false,
      title: 'Produse vandute',
      description: 'De cand ne-am infiintat, numarul produselor vandute a crescut exponential.',
      labels: ['2012', '2013', '2014', '2015'],
      data: [
        [128, 256, 512, 1024]
      ]
    },{
      alignLeft: true,
      title: 'Numar angajati',
      description: 'Alegem cei mai buni oameni din domeniu si avem grija sa lucram numai cu profesionisti.',
      labels: ['2012', '2013', '2014', '2015'],
      data: [
        [12, 14, 24, 26]
      ]
    },{
      alignLeft: false,
      title: 'Numar proiecte',
      description: 'Numarul proiectelor la care am ajutat a crescut in fiecare an, clientii multumiti apeland doar la noi. Acestia ne recomanda si partenerilor lor, stiindu-ne de incredere.',
      labels: ['2012', '2013', '2014', '2015'],
      data: [
        [5, 9, 21, 25]
      ]
    }];
  }
})(angular);
