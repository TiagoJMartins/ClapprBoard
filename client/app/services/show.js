angular.module('MainApp')
  .factory('ShowService', ['$resource', function($resource) {
    return {
    	'findShow': $resource('/api/Shows/find-show'),
    	'trakt': {
    		'find': $resource('/api/Shows/trakt/info'),
    		'query': $resource('/api/Shows/trakt/query'),
    		'seasons': $resource('/api/Shows/trakt/seasons')
    	}
    };
  }]);
