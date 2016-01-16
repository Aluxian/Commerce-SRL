(function(angular) {
  "use strict";

  var app = angular.module('myApp.services', []);

  app.config(['$routeProvider', routeConfig]);

  app.controller('ServicesController', ['$scope', 'fbutil', '$firebaseObject', '$firebaseArray', ServicesController]);

  function routeConfig($routeProvider) {
    $routeProvider.when('/servicii', {
      templateUrl: 'services/services.html',
      controller: 'ServicesController'
    });
  }

  function ServicesController($scope, fbutil, $firebaseObject, $firebaseArray) {
    $scope.services = $firebaseArray(fbutil.ref('services'));
    $scope.servicesTitle = $firebaseObject(fbutil.ref('servicesTitle'));

    $scope.otherServicesTitle = 'ALTE SERVICII';
    $scope.otherServices = [{
      name: 'Consultanta gratuita',
      description: 'Oferim consultanta gratuita tutuor clientilor sau potentialilor clienti.',
      cls: {
        'fa-phone': true
      }
    }, {
      name: 'Suport clienti',
      description: 'Va stam la dispozitie 24 / 7 pentru a va raspunde la orice intrebare',
      cls: {
        'fa-question': true
      }
    }, {
      name: 'Returnare produse',
      description: 'Oferim clientilor nostri serviciul de returnare a produselor conform politicii interne si legislatiei in vigoare.',
      cls: {
        'fa-undo': true
      }
    }, {
      name: 'Comenzi speciale',
      description: 'Va punem la dispozitie serviciul de comenzi speciale. Astfel puteti comanda produsele dorite dar care nu se afla in stoc si veti fi anuntat.',
      cls: {
        'fa-bell': true
      }
    }, {
      name: 'Livrare materiale grele',
      description: 'Cu ajutorul curierilor si cu mijloacele de transport potrivite asiguram transportul si descarcatul materialelor grele',
      cls: {
        'fa-ship': true
      }
    }, {
      name: 'Serviciul de livrare a produselor',
      description: 'Folosind curieri profesionali, firma noastra se asigura ca primiti produsul la scurt timp dudpa ce l-ati comandat',
      cls: {
        'fa-truck': true
      }
    }];
  }
})(angular);
