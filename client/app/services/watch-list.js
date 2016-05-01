angular.module('MainApp')
	.factory('WatchListService', ['$resource', '$rootScope', '$q', 
		function($resource, $rootScope, $q){

			return {
				modify: function(slug, episodes) {
					var user_id = $rootScope.currentUser.id;

					return $resource('/api/WatchLists/modify')
							.save({
								user_id: user_id,
								show_slug: slug,
								episodes: episodes
							}, function(data) {
								return data.result;
							});
				},
				watched: function(slug, episodes) {
					var user_id = $rootScope.currentUser.id;

					return $resource('/api/WatchLists/watched')
							.get({
								user_id: user_id,
								show_slug: slug,
								episodes: episodes
							}).$promise;
				},
				shows: function() {
					var user_id = $rootScope.currentUser.id;

					return $resource('/api/WatchLists/shows')
							.get({
								user_id: user_id
							}).$promise;
				}
			};
	}]);