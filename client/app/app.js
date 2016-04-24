angular.module('MainApp', ['ngResource', 'ngMessages', 'ui.router', 'mgcrea.ngStrap', 'ngCookies', 'lbServices'])
  .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider) {
    //$locationProvider.html5Mode(false);

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
        .state('signup-success', {
          url: '/signup-success',
          templateUrl: 'app/views/signup-success.html'
        })
        .state('logout', {
          url: '/logout',
          controller: 'LogoutCtrl'
        })
        .state('forbidden', {
          url: '/forbidden',
          template: '<p>403 Forbidden</p>'
        });

        $urlRouterProvider.otherwise('home');
  }])
  .run(['$cookies', '$rootScope', 'Client', '$state', function($cookies, $rootScope, Client, $state) {
    $rootScope.currentUser = $cookies.getObject('session');
    $rootScope.isLoggedIn = Client.isAuthenticated();

    $state.go('home');

    $rootScope.$on('$stateChangeStart', function(event, next) {
      if (next.authenticate && !$rootScope.currentUser) {
        event.preventDefault();
        $state.go('forbidden');
      }
    });

  }]);
