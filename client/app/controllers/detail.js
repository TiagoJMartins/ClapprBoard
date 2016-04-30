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
                                    newShow.subscribers = [];

                                    $scope.show = Show.create(newShow);
                                    return;
                              }
                        });
				}

                        $scope.subscribed = ShowService.util.isSubscribed(data.result.subscribers);
                        $scope.show = data.result;
                        $scope.time = moment();
                        $rootScope.error = '';
				return;
			});

                  $scope.subscribe = function() {
                        ShowService.sub.subscribe.save({
                              user: $rootScope.currentUser.id,
                              show: $scope.slug
                        }, function() {
                              $state.go('show-detail', $scope.slug, { reload: true });
                        });
                  }

                  $scope.unsubscribe = function() {
                        ShowService.sub.unsubscribe.save({
                              user: $rootScope.currentUser.id,
                              show: $scope.slug
                        }, function() {
                              $state.go('show-detail', $scope.slug, { reload: true });
                        });
                  }
		}
	]);