angular.module('MainApp', ['ngResource', 'ngMessages', 'ui.router', 'angular-loading-bar',
                           'ngAnimate', 'ngCookies', 'lbServices', 'mgcrea.ngStrap', '720kb.tooltips'])
  .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', 'cfpLoadingBarProvider',
    function($locationProvider, $stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {
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
        .state('show-episodes', {
          url: '/shows/:id/episodes',
          templateUrl: 'app/views/seasondetail.html',
          controller: 'EpisodeCtrl'
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

        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.parentSelector = '#loading-bar';
        cfpLoadingBarProvider.latencyThreshold = 350;

        $urlRouterProvider.otherwise('home');
  }])
  .run(['$cookies', '$rootScope', 'Client', '$state',
   function($cookies, $rootScope, Client, $state) {
    $rootScope.currentUser = $cookies.getObject('session');
    $rootScope.isLoggedIn = Client.isAuthenticated();

    $state.go('home');

    $rootScope.$on('$stateChangeStart', function(event, next) {
      if (next.authenticate && !$rootScope.currentUser) {
        event.preventDefault();
        $state.go('forbidden');
      }
    });

    $rootScope.$on('$stateChangeSuccess', function(e, to, toParams, from, fromParams) {
      $rootScope.previousState = from.name;
      $rootScope.previousParams = fromParams;
    });

    $rootScope.prevState = function(state, params) {
      $state.go(state, params);
    };

  }]);
