angular.module('MainApp')
	.controller('DetailCtrl', ['$scope', '$rootScope', 'ShowService', '$state', 'Show',
		function($scope, $rootScope, ShowService, $state, Show) {

			$scope.slug = $state.params.id;
			$scope.working = true;
			$scope.show = {};
			
			$scope.tabs = [{
			      title: 'Season 1',
			      template: 'app/views/episodes.html',
			      content: 'Raw denim you probably haven\'t heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica.'
			}, {
			      title: 'Season 2',
			      template: 'app/views/episodes.html',
			      content: 'Food truck fixie locavore, accusamus mcsweeney\'s marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee.'
			}, {
			      title: 'Season 3',
			      template: 'app/views/episodes.html',
			      content: 'Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney\'s organic lomo retro fanny pack lo-fi farm-to-table readymade.'
			}, {
			      title: 'Season 4',
			      template: 'app/views/episodes.html',
			      content: 'Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney\'s organic lomo retro fanny pack lo-fi farm-to-table readymade.'
			}, {
			      title: 'Season 5',
			      template: 'app/views/episodes.html',
			      content: 'Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney\'s organic lomo retro fanny pack lo-fi farm-to-table readymade.'
			}, {
			      title: 'Season 6',
			      template: 'app/views/episodes.html',
			      content: 'Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney\'s organic lomo retro fanny pack lo-fi farm-to-table readymade.'
			}];
			
			$scope.tabs.activeTab = 1;

			ShowService.findShow.get({ slug: $scope.slug }, function(data) {

				if(!data.result) {
					ShowService.trakt.find.get({ slug: $scope.slug }, function(result) {
                              if (result.error) {
                                    $rootScope.error = 'Requested show could not be found.';
                                    $scope.working = false;
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

                                    Show.create(newShow);
                                    $scope.show = newShow;
                                    $scope.working = false;
                                    return;
                              }
                        });
				}

				$scope.show = data.result;
				$scope.time = moment();
				$rootScope.error = '';
				$scope.working = false;
				return;
			});

		}
	]);