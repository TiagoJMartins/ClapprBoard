angular.module('MainApp')
	.factory('WatchListService', ['$resource', '$rootScope', 
		function($resource, $rootScope){

			return {
				watch: function(slug, episodes) {
					var user_id = $rootScope.currentUser.id;

					return $resource('/api/WatchLists/add')
							.save({
								user_id: user_id,
								show_slug: slug,
								episodes: episodes
							}, function(data) {
								return data.result;
							});
				},
				unwatch: function(slug, episodes) {
					var user_id = $rootScope.currentUser.id;

					return $resource('/api/WatchLists/remove')
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
							}, function(res) {
								console.log('res', res);
								return res.result;
							});
				}
			};
	}]);