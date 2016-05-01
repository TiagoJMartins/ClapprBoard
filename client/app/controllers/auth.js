angular.module('MainApp')
  .controller('LoginCtrl', ['$scope', '$window', 'AuthService', '$state', '$rootScope',
    function($scope, $window, AuthService, $state, $rootScope) {

      $scope.credentials = {
        email: 'foo@bar.com',
        password: 'foobar',
        remember: false
      };

      $scope.login = function() {
        AuthService.login($scope.credentials)
          .then(function() {
            $window.location.href = '/';
          });
      };
    }
  ])
  .controller('LogoutCtrl', ['$rootScope', '$window', 'AuthService',
    function($rootScope, $window, AuthService) {

      AuthService.logout()
        .then(function() {
          $window.location.href = '/';
        });
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
          });
      };
  }]);
