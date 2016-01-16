(function(angular) {
  "use strict";

  var app = angular.module('myApp.build', ['ngRoute', 'firebase', 'firebase.utils']);

  app.config(['$routeProvider', routeConfig]);

  app.controller('BuildController', ['$scope', 'fbutil', '$firebaseObject', '$firebaseArray', BuildController]);

  function routeConfig($routeProvider) {
    $routeProvider.when('/construieste', {
      templateUrl: 'builder/build.html',
      controller: 'BuildController'
    });
  }

  function BuildController($scope, fbutil, $firebaseObject, $firebaseArray) {
    $scope.progress = 0;
    $scope.buildForms = [];

    $scope.builderFormsFirebase = $firebaseArray(fbutil.ref('builderForms'));
    $scope.builderExpression = $firebaseObject(fbutil.ref('builderExpression'));
    $scope.builderTitle = $firebaseObject(fbutil.ref('builderTitle'));

    $scope.$watch('builderFormsFirebase', function(newVal, oldVal) {
      if (!newVal) return;

      $scope.buildForms = [];

      $scope.builderFormsFirebase.forEach(function(f) {
        $scope.buildForms.push(angular.copy(f));
      });
    }, true);

    $scope.getBuildResults = getBuildResults;
    $scope.completedForms = completedForms;
    $scope.completedAllForms = completedAllForms;
    $scope.buildFormsLength = buildFormsLength;

    function buildFormsLength() {
      return $scope.buildForms.length;
    }

    function completedAllForms() {
      return $scope.buildForms.length == completedForms();
    }

    function completedForms() {
      var completed = 0;

      $scope.buildForms.forEach(function(form) {
        if (form.value) {
          completed++;
        }
      });

      return completed;
    }

    function getBuildResults(forms, expression) {
      if (!completedAllForms()) return;
      if (!expression) return;

      forms.forEach(function(form) {
        var regexp = new RegExp(form.key, "g");

        expression = expression.replace(regexp, form.value);
      });

      expression = expression.replace(/numarCamere/g, 10);

      return eval(expression);
    }
  }
})(angular);
