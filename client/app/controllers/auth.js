angular.module('MainApp')
  .controller('LoginCtrl', ['$scope', '$window', 'AuthService',
    function($scope, $window, AuthService) {

      $scope.credentials = {
        email: 'tiago@coisas.com',
        password: '123'
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
        password: ""
      };

      $scope.signup = function() {
        AuthService.signup($scope.credentials)
          .then(function() {
            $state.go('signup-success');
          });
      };
  }]);
