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
  .controller('LogoutCtrl', ['$rootScope', '$location', 'AuthService',
    function($rootScope, $location, AuthService) {

      AuthService.logout()
        .then(function() {
          $window.location.href = '/';
        });
    }
  ]);
