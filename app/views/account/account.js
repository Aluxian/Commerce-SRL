(function (angular) {
  "use strict";

  var app = angular.module('myApp.account', ['firebase', 'firebase.utils', 'firebase.auth', 'ngRoute']);

  app.controller('AccountCtrl', ['$scope', 'Auth', 'fbutil', 'user', '$location', '$firebaseObject', '$firebaseArray',
    function($scope, Auth, fbutil, user, $location, $firebaseObject, $firebaseArray) {
      $scope.products = $firebaseArray(fbutil.ref('products'));
      $scope.productsTitle = $firebaseObject(fbutil.ref('productsTitle'));
      $scope.services = $firebaseArray(fbutil.ref('services'));
      $scope.servicesTitle = $firebaseObject(fbutil.ref('servicesTitle'));
      $scope.projects = $firebaseArray(fbutil.ref('projects'));
      $scope.projectsTitle = $firebaseObject(fbutil.ref('projectsTitle'));
      $scope.partners = $firebaseArray(fbutil.ref('partners'));
      $scope.partnersTitle = $firebaseObject(fbutil.ref('partnersTitle'));
      $scope.builderForms = $firebaseArray(fbutil.ref('builderForms'));
      $scope.builderExpression = $firebaseObject(fbutil.ref('builderExpression'));
      $scope.builderTitle = $firebaseObject(fbutil.ref('builderTitle'));
      $scope.principles = $firebaseArray(fbutil.ref('principles'));
      $scope.principlesTitle = $firebaseObject(fbutil.ref('principlesTitle'));
      $scope.members = $firebaseArray(fbutil.ref('members'));
      $scope.membersTitle = $firebaseObject(fbutil.ref('membersTitle'));
      $scope.testimonials = $firebaseArray(fbutil.ref('testimonials'));
      $scope.testimonialsTitle = $firebaseObject(fbutil.ref('testimonialsTitle'));
      $scope.team = $firebaseArray(fbutil.ref('team'));
      $scope.teamTitle = $firebaseObject(fbutil.ref('teamTitle'));
      $scope.processes = $firebaseArray(fbutil.ref('processes'));
      $scope.processesTitle = $firebaseObject(fbutil.ref('processesTitle'));

      var options = $firebaseObject(fbutil.ref('options'));
      options.$bindTo($scope, 'options');

      $scope.addToArray = function(obj, array) {
        array.$add(obj);
      };

      $scope.removeFromArray = function(obj, array) {
        array.$remove(obj);
      };

      $scope.editObject = function(obj, entity) {
        entity.fields.forEach(function(field) {
          obj[field.key + '_temp'] = obj[field.key];
        });

        obj.edited = true;
      };

      $scope.stopEditingObject = function(obj) {
        obj.edited = false;
      };

      $scope.saveObjectInArray = function(obj, array) {
        for (var property in obj) {
          if (obj.hasOwnProperty(property) && property.indexOf('_temp') != -1) {
            var value = obj[property];

            obj[property] = null;

            property = property.replace('_temp', '');

            obj[property] = typeof(value) == 'undefined' ? null : value;
          }
        }

        obj.edited = false;

        array.$save(obj);
      };

      $scope.optionsList = [
        { name: 'Titlu aplicatie', key: 'title' },
        { name: 'Numele firmei', key: 'name' },
        { name: 'Numar de telefon', key: 'phoneNumber' },
        { name: 'Email', key: 'email' },
        { name: 'Adresa', key: 'address' },
        { name: 'Program', key: 'hours', type: 'textarea' },
        { name: 'Facebook', key: 'facebookAddress' },
        { name: 'Nr. Reg. Comertului', key: 'regComert' },
        { name: 'Nr. firma', key: 'numar' },
        { name: 'Motto', key: 'motto' }
      ];

      $scope.entityAccount = {
        active: true
      };

      $scope.entities = [
        {
          id: 'builderForm',
          name: 'Construieste proiect',
          title: $scope.builderTitle,
          singular: 'form',
          contents: $scope.builderForms,
          isBuilder: true,
          fields: [
            { name: 'Name', key: 'name' },
            { name: 'Key', key: 'key' }
          ]
        },
        {
          id: 'products',
          name: 'Produse',
          title: $scope.productsTitle,
          singular: 'produs',
          contents: $scope.products,
          fields: [
            { name: 'Nume', key: 'name' },
            { name: 'Descriere', key: 'description' },
            { name: 'Pret', key: 'price', type: 'number' },
            { name: 'Imagine (url)', key: 'image' }
          ]
        },
        {
          id: 'services',
          name: 'Servicii',
          title: $scope.servicesTitle,
          singular: 'serviciu',
          contents: $scope.services,
          fields: [
            { name: 'Nume', key: 'name' },
            { name: 'Descriere', key: 'description' },
            { name: 'Imagine (url)', key: 'image' }
          ]
        },
        {
          id: 'projects',
          name: 'Proiecte',
          title: $scope.projectsTitle,
          singular: 'proiect',
          contents: $scope.projects,
          fields: [
            { name: 'Name', key: 'name' },
            { name: 'Descriere', key: 'description' },
            { name: 'Imagine (url)', key: 'image' }
          ]
        },
        {
          id: 'partners',
          name: 'Parteneri',
          title: $scope.partnersTitle,
          singular: 'partener',
          contents: $scope.partners,
          fields: [
            { name: 'Name', key: 'name' },
            { name: 'Descriere', key: 'description' },
            { name: 'Anul in care a inceput parteneriatul', key: 'startYear' },
            { name: 'Imagine (url)', key: 'image' }
          ]
        },
        {
          id: 'principles',
          name: 'Principii',
          title: $scope.principlesTitle,
          singular: 'principiu',
          contents: $scope.principles,
          fields: [
            { name: 'Titlu', key: 'name' },
            { name: 'Descriere', key: 'description' }
          ]
        },
        {
          id: 'processes',
          name: 'Procese',
          title: $scope.processesTitle,
          singular: 'proces',
          contents: $scope.processes,
          fields: [
            { name: 'Titlu', key: 'name' },
            { name: 'Descriere', key: 'description' }
          ]
        },
        {
          id: 'Testimonials',
          name: 'Testimoniale',
          title: $scope.testimonialsTitle,
          singular: 'testimonial',
          contents: $scope.testimonials,
          fields: [
            { name: 'Continut', key: 'content' },
            { name: 'Autor', key: 'author' },
            { name: 'Companie', key: 'company' }
          ]
        },
        {
          id: 'Team',
          name: 'Echipa',
          title: $scope.teamTitle,
          singular: 'membru',
          contents: $scope.team,
          fields: [
            { name: 'Nume complet', key: 'name' },
            { name: 'Descriere', key: 'description' },
            { name: 'Imagine', key: 'image' }
          ]
        }
      ];

      var unbind;
      // create a 3-way binding with the user profile object in Firebase
      var profile = $firebaseObject(fbutil.ref('users', user.uid));
      profile.$bindTo($scope, 'profile').then(function(ub) { unbind = ub; });

      // expose logout function to scope
      $scope.logout = function() {
        if( unbind ) { unbind(); }
        profile.$destroy();
        Auth.$unauth();
        $location.path('/login');
      };

      $scope.changePassword = function(pass, confirm, newPass) {
        resetMessages();
        if( !pass || !confirm || !newPass ) {
          $scope.err = 'Please fill in all password fields';
        }
        else if( newPass !== confirm ) {
          $scope.err = 'New pass and confirm do not match';
        }
        else {
          Auth.$changePassword({email: profile.email, oldPassword: pass, newPassword: newPass})
            .then(function() {
              $scope.msg = 'Password changed';
            }, function(err) {
              $scope.err = err;
            })
        }
      };

      $scope.clear = resetMessages;

      $scope.changeEmail = function(pass, newEmail) {
        resetMessages();
        var oldEmail = profile.email;
        Auth.$changeEmail({oldEmail: oldEmail, newEmail: newEmail, password: pass})
          .then(function() {
            // store the new email address in the user's profile
            return fbutil.handler(function(done) {
              fbutil.ref('users', user.uid, 'email').set(newEmail, done);
            });
          })
          .then(function() {
            $scope.emailmsg = 'Email changed';
          }, function(err) {
            $scope.emailerr = err;
          });
      };

      function resetMessages() {
        $scope.err = null;
        $scope.msg = null;
        $scope.emailerr = null;
        $scope.emailmsg = null;
      }
    }
  ]);

  app.config(['$routeProvider', function($routeProvider) {
    // require user to be authenticated before they can access this page
    // this is handled by the .whenAuthenticated method declared in
    // components/router/router.js
    $routeProvider.whenAuthenticated('/dashboard', {
      templateUrl: 'account/account.html',
      controller: 'AccountCtrl'
    })
  }]);

})(angular);
