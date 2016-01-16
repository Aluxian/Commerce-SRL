(function(angular) {
  "use strict";

  var app = angular.module('myApp.chat', ['ngRoute', 'firebase.utils', 'firebase']);

  app.controller('ChatCtrl', ['$scope', '$rootScope', '$firebaseObject', 'fbutil', 'messageList', function($scope, $rootScope, $firebaseObject, fbutil, messageList) {
    var profile = $firebaseObject(fbutil.ref('users', $rootScope.user.uid));

    $scope.messages = messageList;
    $scope.addMessage = function(newMessage) {
      if (newMessage) {
        $scope.messages.$add({
          text: newMessage,
          author: profile.name || 'Anonymous',
          date: Date.now()
        });
      }
    };
  }]);

  app.factory('messageList', ['fbutil', '$firebaseArray', function(fbutil, $firebaseArray) {
    var ref = fbutil.ref('messages').limitToLast(10);
    return $firebaseArray(ref);
  }]);

})(angular);
