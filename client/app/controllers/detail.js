angular.module('MainApp')
	.controller('DetailCtrl', ['$scope', '$rootScope', 'ShowService', '$state', 'Show',
		function($scope, $rootScope, ShowService, $state, Show) {

			$scope.slug = $state.params.id;
			$scope.show = {};

			ShowService.findShow.get({ slug: $scope.slug }, function(data) {

				if(!data.result) {
					ShowService.trakt.find.get({ slug: $scope.slug }, function(result) {
                              if (result.error) {
                                    $rootScope.error = 'Requested show could not be found.';
                                    return;
                              } else {
                                    var data = result.result;

                                    var newShow = {};
                                    newShow.title = data.title;
                                    newShow.year = data.year;
                                    newShow.ids = data.ids;
                                    newShow.overview = data.overview;
                                    newShow.first_aired = data.first_aired;
                                    newShow.airs = data.airs;
                                    newShow.runtime = data.runtime;
                                    newShow.network = data.network;
                                    newShow.country = data.country;
                                    newShow.trailer = data.trailer;
                                    newShow.homepage = data.homepage;
                                    newShow.status = data.status;
                                    newShow.rating = Math.round(data.rating * 10) / 10;
                                    newShow.votes = data.votes;
                                    newShow.language = data.language;
                                    newShow.genres = data.genres;
                                    newShow.aired_episodes = data.aired_episodes;
                                    newShow.images = data.images;
                                    newShow.slug = $scope.slug;

                                    $scope.show = Show.create(newShow);
                                    return;
                              }
                        });
				}

				/*
				if (!data.result.seasons) {
						ShowService.trakt.seasons.get({
						id: $scope.slug
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

						Show.prototype$updateAttributes(
						{
							'id': $scope.show.id
						},
						{
							'seasons': newArr
						});

						$state.go($state.current, {}, {reload: true});
					});
				}
				*/

				$scope.show = data.result;
				$scope.time = moment();
				$rootScope.error = '';
				return;
			});
		}
	]);