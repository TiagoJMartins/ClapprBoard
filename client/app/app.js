angular.module('MainApp', ['ngResource', 'ngMessages', 'ui.router', 'mgcrea.ngStrap', 'ngCookies', 'lbServices'])
  .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'app/views/home.html',
          controller: 'MainCtrl'
        })
        .state('show-detail', {
          url: '/shows/:id',
          templateUrl: 'app/views/showdetail.html',
          controller: 'DetailCtrl'
        })
        .state('login', {
          url: '/login',
          templateUrl: 'app/views/login.html',
          controller: 'LoginCtrl'
        })
        .state('signup', {
          url: '/signup',
          templateUrl: 'app/views/signup.html',
          controller: 'SignupCtrl'
        })
        .state('logout', {
          url: '/logout',
          controller: 'LogoutCtrl'
        })
        .state('forbidden', {
          url: '/forbidden',
          template: '<p>401 Forbidden</p>'
        });

        $urlRouterProvider.otherwise('home');
  }])
  .run(['$cookies', '$rootScope', 'Client', '$state', function($cookies, $rootScope, Client, $state) {
    $rootScope.currentUser = $cookies.getObject('session');
    $rootScope.isLoggedIn = Client.isAuthenticated();

    $rootScope.$on('$stateChangeStart', function(event, next) {
      if (next.authenticate && !$rootScope.currentUser) {
        event.preventDefault();
        $state.go('forbidden');
      }
    });

  }]);
