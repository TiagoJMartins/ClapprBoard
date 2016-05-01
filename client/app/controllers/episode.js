angular.module('MainApp')
    .controller('EpisodeCtrl', ['$scope', 'ShowService', '$state', 'Show', '$rootScope', 'WatchListService',
        function($scope, ShowService, $state, Show, $rootScope, WatchListService) {

            var slug = $state.params.id;
            $rootScope.error = '';
            $scope.show = {};
            $scope.watchlistSelection = [];

            $scope.tab = 1;
            $scope.setTab = function(pos) {
                $scope.tab = pos;
            };

            $scope.watch = function() {
                WatchListService
                    .modify(slug, $scope.watchlistSelection)
                    .then(function() {
                        $state.go($state.current, slug, { reload: true });
                    })
                    .catch(function(err) {
                        console.log('Error modifying watchlist', err);
                    });
            };

            $scope.toggleOnWatchlist = function(ep_id) {
                var index = $scope.watchlistSelection.indexOf(ep_id);

                if (index > -1) {
                    $scope.watchlistSelection.splice(index, 1);
                } else {
                    $scope.watchlistSelection.push(ep_id);
                }
            };

            ShowService.findShow.get({ slug: slug }, function(data) {
            if(!data.result) {
                $rootScope.error = 'Requested show could not be found.';
                return;
            }

            $scope.subscribed = ShowService.util.isSubscribed(data.result.subscribers);
            WatchListService.watched(slug)
                .then(function(watchlist) {
                    $scope.watchlist = watchlist.result;
                    $scope.show = data.result;
                })
                .catch(function(err) {
                    console.log(err);
                });
            $scope.time = moment();
            $rootScope.error = '';
            return;
        });
        }
    ]);