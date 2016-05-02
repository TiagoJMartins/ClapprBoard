angular.module('MainApp')
.controller('MyShowsCtrl', ['$scope', 'WatchListService', 'Show', '$rootScope',
	function($scope, WatchListService, Show, $rootScope){
	
		$scope.subscriptions = {};
		$scope.shows = {};
		$scope.stats = {};
		
		WatchListService
		.shows()
		.then(function(subShows) {
			if (!subShows.result) {
				$rootScope.error = "You didn't subscribe to any shows yet.";
				return;
			}

			$scope.subscriptions = subShows.result;
			var showArray = Object.keys($scope.subscriptions);

			async.forEach(showArray, function(show, callback) {
				if (show.length) {
					Show.findOne({
						filter: {
							where: {
								slug: show
							}
						}
					}, function(inst) {
						$scope.shows[show] = inst;
					})
				}
				callback();
			}, function(err) {
				if (err) return console.log(err);
			});
		})
		.catch(function(err) {
			console.log(err);
		});

}]);