angular.module('MainApp')
  .factory('ShowService', ['$resource', '$rootScope', function($resource, $rootScope) {
    return {
    	'findShow': $resource('/api/Shows/find-show'),
    	'trakt': {
    		'find': $resource('/api/Shows/trakt/info'),
    		'query': $resource('/api/Shows/trakt/query'),
    		'seasons': $resource('/api/Shows/trakt/seasons'),
            'episodes': $resource('/api/Shows/trakt/episodes')
    	},
        'sub': {
            'subscribe': $resource('/api/Shows/subscribe'),
            'unsubscribe': $resource('/api/Shows/unsubscribe')
        },
        'util': {
            isSubscribed: function(subscribers) {
                var user_id = $rootScope.currentUser.id;
                return subscribers.indexOf(user_id) === -1 ? false : true;
            }
        }
    };
  }]);
