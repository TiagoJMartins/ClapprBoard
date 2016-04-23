angular.module('MainApp')
  .controller('LoginCtrl', ['$scope', '$location', 'AuthService',
    function($scope, $location, AuthService) {

      $scope.credentials = {
        email: 'tiago@coisas.com',
        password: '123'
      };

      $scope.login = function() {
        AuthService.login($scope.credentials)
          .then(function() {
            $location.path('/');
          });
      };
    }
  ])
  .controller('LogoutCtrl', ['$rootScope', '$location', 'AuthService',
    function($rootScope, $location, AuthService) {

      AuthService.logout()
        .then(function() {
          console.log('logoutctrl');
          $location.path('/');
        });
    }
  ]);
