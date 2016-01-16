'use strict';

angular
  .module('myApp')
  .factory('pageSwitch', pageSwitch);

pageSwitch.$inject = ['$rootScope', '$anchorScroll'];

function pageSwitch($rootScope, $anchorScroll) {
  var registerListener = _.once(function() {
    $rootScope.$on('$locationChangeSuccess', scrollToTop);
  });

  return {
    registerListener: registerListener
  };

  function scrollToTop() {
    $anchorScroll();
  }
}
