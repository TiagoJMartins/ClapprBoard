angular.module('MainApp')
	.controller('EpisodeCtrl', ['$scope', 'ShowService', '$state', 'Show', '$rootScope',
		function($scope, ShowService, $state, Show, $rootScope){
		
			var slug = $state.params.id;
			$scope.show = {};
			$rootScope.error = '';

			Show.find({
				filter: {
					where: {
						slug: slug
					}
				}
			}, function(data) {
				if (!data) {
					$rootScope.error = 'The information requested could not be retrieved.';
					return;
				}
				
				var show = data[0];

				if (!show.seasons) {
					ShowService.trakt.seasons.get({
						id: slug
					}, function(data) {
						
						if(!data.results) {
							$rootScope.error = 'Could not find any seasons for this show.';
							return;
						}

						var seasons = data.results;

						var newArr = [];

						
						seasons.forEach(function(season) {
							if (season.number) {
								var obj = {
									title: 'Season ' + season.number,
									content: {
										rating: Math.round(season.rating * 10) / 10,
										episode_count: season.episode_count,
										aired_episodes: season.aired_episodes,
										first_aired: season.first_aired,
										overview: season.overview,
										images: season.images
									}
								}
								newArr.push(obj);
							}
						});

						show.seasons = newArr;
						show.$save().then(function(data) {
							$scope.show = data;
						})
						.catch(function(err) {
							$rootScope.error = 'Error saving season information to the database.'
						});

						return;
					});
				}

				$scope.show = show;
				return;
			});

	}]);