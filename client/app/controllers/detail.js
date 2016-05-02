angular.module('MainApp')
.controller('DetailCtrl', ['$scope', '$rootScope', 'ShowService', '$state', 'Show',
	function($scope, $rootScope, ShowService, $state, Show) {

		$scope.slug = $state.params.id;
		$scope.show = {};
            

		ShowService.findShow.get({ slug: $scope.slug }, function(data) {
			if(!data.result) {
                        $rootScope.error = 'Requested show could not be found.';
                        return;
			}

                  $rootScope.error = '';
                  $scope.subscribed = ShowService.util.isSubscribed(data.result.subscribers);
                  $scope.show = data.result;

                  $scope.nextEpisodes = $scope.show.episode_meta.filter(function(episode) {
                        var aired = episode.first_aired;
                        aired = moment(aired.substr(0, aired.length - 1));
                        var now = moment();
                        return aired.isAfter(now);
                  });

                  $scope.latestEpisodes = $scope.show.episode_meta.filter(function(episode) {
                        var aired = episode.first_aired;
                        aired = moment(aired.substr(0, aired.length - 1));
                        var now = moment();
                        return aired.isBefore(now);
                  });
                  $scope.latestEpisodes.splice(0, $scope.latestEpisodes.length - 3);
                  $scope.latestEpisodes.reverse();

            });

	}
]);