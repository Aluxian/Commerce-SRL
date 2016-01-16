'use strict';

angular.module('myApp', [
  'myApp.config',
  'myApp.security',
  'myApp.home',
  'myApp.account',
  'myApp.login',
  'myApp.products',
  'myApp.services',
  'myApp.portfolio',
  'myApp.partners',
  'myApp.performance',
  'myApp.contact',
  'myApp.build',
  'myApp.chat',
  'myApp.header',
  'myApp.footer',
  'ui.bootstrap',
  'ngAnimate',
  'chart.js'
])

.run(['$rootScope', 'Auth', function($rootScope, Auth) {
  Auth.$onAuth(function(user) {
    $rootScope.user = user;
    $rootScope.loggedIn = !!user;
  });
}])

.run(['pageSwitch', function(pageSwitch) {
  pageSwitch.registerListener();
}]);
