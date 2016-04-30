angular.module('MainApp')
	.factory('EpisodeService', ['$resource', '$rootScope', 
		function($resource, $rootScope){
			
			var user_id = $rootScope.currentUser.id;

			return {
				watch: function() {

				},
				unwatch: function() {

				},
				watched: function() {

				}
			};
	}]);