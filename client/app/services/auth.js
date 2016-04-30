angular.module('MainApp')
  .factory('AuthService', ['Client', '$q', '$rootScope', '$cookies',
    function(Client, $q, $rootScope, $cookies) {

      function login(credentials) {
        return Client
          .login({ rememberMe: credentials.remember }, credentials)
          .$promise
          .then(function(res) {
            
          });
      }

      function logout() {
        return Client
          .logout()
          .$promise
          .then(function() {
            
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
