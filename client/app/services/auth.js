angular.module('MainApp')
  .factory('AuthService', ['Client', '$q', '$rootScope', '$cookies',
    function(Client, $q, $rootScope, $cookies) {

      function login(credentials) {
        return Client
          .login({ rememberMe: credentials.remember }, credentials)
          .$promise;
      }

      function logout() {
        return Client
          .logout()
          .$promise;
      }

      function register(credentials) {
        return Client
          .create(credentials)
          .$promise;
      }

      return {
        login: login,
        logout: logout,
        signup: register
      };
    }
  ]);
