angular.module('MainApp', ['ngResource', 'ngMessages', 'ui.router', 'angular-loading-bar',
                           'ngAnimate', 'ngCookies', 'lbServices', 'mgcrea.ngStrap', '720kb.tooltips',
                           'checklist-model'])
  .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', 'cfpLoadingBarProvider',
    function($locationProvider, $stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {
    //$locationProvider.html5Mode(false);

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'app/views/home.html',
          controller: 'MainCtrl',
          authenticate: true
        })
        .state('show-detail', {
          url: '/shows/:id',
          templateUrl: 'app/views/showdetail.html',
          controller: 'DetailCtrl',
          authenticate: true
        })
        .state('my-shows', {
          url:'/myshows',
          templateUrl: 'app/views/myshows.html',
          controller: 'MyShowsCtrl',
          authenticate: true
        })
        .state('show-episodes', {
          url: '/shows/:id/episodes',
          templateUrl: 'app/views/seasondetail.html',
          controller: 'EpisodeCtrl',
          authenticate: true
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
          controller: 'LogoutCtrl',
          authenticate: true
        })
        .state('forbidden', {
          url: '/forbidden',
          templateUrl: 'app/views/forbidden.html'
        });

        cfpLoadingBarProvider.parentSelector = '#loading-bar';
        cfpLoadingBarProvider.latencyThreshold = 400;

        $urlRouterProvider.otherwise('home');
  }])
  .run(['$cookies', '$rootScope', 'Client', '$state',
   function($cookies, $rootScope, Client, $state) {
    
    Client.getCurrent(function(success) {
      $rootScope.currentUser = success;
    }, function(err) {
      $rootScope.currentUser = null;
    });
    
    $rootScope.isLoggedIn = Client.isAuthenticated();

    if ($rootScope.isLoggedIn) {
      $state.go('home');  
    } else {
      $state.go('login');
    }
    

    $rootScope.$on('$stateChangeStart', function(event, next, params) {
      if (next.authenticate && !$rootScope.isLoggedIn) {
        
        event.preventDefault();
        $rootScope.afterAuth = {
          next: next,
          params: params
        };
        
        if (next.name === 'home') {
          $state.go('login');
        } else {
          $state.go('forbidden');  
        }
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
