angular.module('MainApp')
  .factory('AuthService', ['Client', '$q', '$rootScope', '$cookies',
    function(Client, $q, $rootScope, $cookies) {

      function login(credentials) {
        return Client
          .login(credentials)
          .$promise
          .then(function(res) {
            var obj = {
              currentUser: {
                id: res.user.id,
                token: res.id,
                email: credentials.email
              }
            };
            console.log(res);
            $cookies.putObject('currentUser', obj)
          });
      }

      function logout() {
        return Client
          .logout()
          .$promise
          .then(function() {
            console.log('logoutservice');
            $cookies.remove('currentUser');
          });
      }

      // register()

      return {
        login: login,
        logout: logout
      };
    }
  ]);
