angular.module('MainApp')
  .controller('LoginCtrl', ['$scope', '$window', 'AuthService', '$state', '$rootScope',
    function($scope, $window, AuthService, $state, $rootScope) {

      $scope.credentials = {
        email: 'foo@bar.com',
        password: 'foobar',
        remember: true
      };

      $scope.credentials = {
        email: '',
        password: '',
        remember: true
      };
      
      $rootScope.bgImg = "url('assets/sherlock-blur.jpg') 50% 10% no-repeat fixed";

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
  .controller('SignupCtrl', ['AuthService', '$state', '$scope', '$rootScope',
    function(AuthService, $state, $scope, $rootScope) {

      $scope.credentials = {
        email: "",
        password: "",
        confirm: ""
      };
      
      $rootScope.bgImg = "url('assets/banshee-blur.jpg') 50% 10% no-repeat fixed";

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
