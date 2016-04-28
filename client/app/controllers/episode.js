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

						newArr.forEach(function(season) {

							var episodeCount = season.content.episode_count;
							season.content.episodes = [];
							(function(count, season) {
								var i = 1;
								function forloop(){
									if (i < count) {
										ShowService.trakt.episodes.get({
											slug: slug,
											season: season.title.substring(season.title.length - 1, season.title.length),
											episode: i
										}, function(ep) {
											var self = season.content.episodes;
											self.push(ep.result);
											i++;
											forloop();
										});
									} else {
										console.log('Loop finished!', i);
									}
								}
								forloop();
							})(episodeCount, season);
						});
						
						console.log('Arr', newArr)

						show.seasons = newArr;

						console.log('show.seasons', show.seasons);

						show.$save()
						.then(function(data) {
							console.log('saved data');
							$scope.show = data;
						})
						.catch(function(err) {
							console.log('error saving data');
							$rootScope.error = 'Error saving season information to the database.'
						});

						return;
					});
				}

				$scope.show = show;
				return;
			});

	}]);