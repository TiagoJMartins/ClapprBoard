angular.module('MainApp')
  .factory('AuthService', ['Client', '$q', '$rootScope', '$cookies',
    function(Client, $q, $rootScope, $cookies) {

      function login(credentials) {
        return Client
          .login(credentials)
          .$promise
          .then(function(res) {
            var obj = {
                id: res.user.id,
                token: res.id,
                email: credentials.email
              };
            $cookies.putObject('session', obj);
            $rootScope.currentUser = obj;
          });
      }

      function logout() {
        return Client
          .logout()
          .$promise
          .then(function() {
            $cookies.remove('session');
            $rootScope.currentUser = null;
          });
      }

      // register()

      return {
        login: login,
        logout: logout
      };
    }
  ]);
