angular.module('MainApp')
.controller('MyShowsCtrl', ['$scope', 'WatchListService', 'Show', '$rootScope',
	function($scope, WatchListService, Show, $rootScope){
	
		$scope.subscriptions = {};
		
		WatchListService
		.shows()
		.then(function(subShows) {
			if (!subShows.result) {
				$rootScope.error = "You didn't subscribe to any shows yet.";
				return;
			}

			$scope.subscriptions = subShows.result;
		})
		.catch(function(err) {
			console.log(err);
		});

}]);