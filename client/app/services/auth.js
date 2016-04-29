angular.module('MainApp')
  .factory('AuthService', ['Client', '$q', '$rootScope', '$cookies',
    function(Client, $q, $rootScope, $cookies) {

      function login(credentials) {
        return Client
          .login({ rememberMe: credentials.remember }, credentials)
          .$promise
          .then(function(res) {
            var obj = {
                id: res.user.id,
                token: res.id,
                email: credentials.email
              };
            
            if (credentials.remember) {
              $cookies.putObject('session', obj);        
            }
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

      function register(credentials) {
        return Client
          .create(credentials)
          .$promise
          .then(function(res) {
            
          });
      }

      return {
        login: login,
        logout: logout,
        signup: register
      };
    }
  ]);
