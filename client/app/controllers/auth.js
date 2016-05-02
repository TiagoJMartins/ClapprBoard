angular.module('MainApp')
  .controller('LoginCtrl', ['$scope', '$window', 'AuthService', '$state', '$rootScope',
    function($scope, $window, AuthService, $state, $rootScope) {

      $scope.credentials = {
        email: 'foo@bar.com',
        password: 'foobar',
        remember: true
      };

      $scope.login = function() {
        AuthService.login($scope.credentials)
          .then(function() {
            $window.location.href = '/';
          })
          .catch(function(err) {
            console.log('Login error', err);
          });
      };
    }
  ])
  .controller('LogoutCtrl', ['$rootScope', '$window', 'AuthService',
    function($rootScope, $window, AuthService) {

      AuthService.logout()
        .then(function() {
          $window.location.href = '/';
        })
        .catch(function() {
          console.log('Auth token has expires, clearing localStorage and sessionStorage.');
          window.localStorage.removeItem('$LoopBack$accessTokenId');
          window.localStorage.removeItem('$LoopBack$currentUserId');
          $window.location.href = '/';
        })
    }
  ])
  .controller('SignupCtrl', ['AuthService', '$state', '$scope',
    function(AuthService, $state, $scope) {

      $scope.credentials = {
        email: "",
        password: "",
        confirm: ""
      };

      $scope.signup = function() {
        AuthService.signup($scope.credentials)
          .then(function() {
            $state.go('signup-success');
          })
          .catch(function(err) {
            console.log('Signup error', err);
          })
      };
  }]);
