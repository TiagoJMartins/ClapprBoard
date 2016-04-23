angular.module('MainApp', ['ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap', 'ngCookies', 'lbServices'])
  .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'app/views/home.html',
        controller: 'MainCtrl'
      })
      .when('/shows/:id', {
        templateUrl: 'app/views/showdetail.html',
        controller: 'DetailCtrl'
      })
      .when('/login', {
        templateUrl: 'app/views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'app/views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/add', {
        templateUrl: 'app/views/add.html',
        controller: 'AddCtrl'
      })
      .when('/logout', {
        controller: 'LogoutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .run(['$cookies', '$rootScope', function($cookies, $rootScope) {
    $rootScope.currentUser = $cookies.getObject('currentUser');
  }]);
