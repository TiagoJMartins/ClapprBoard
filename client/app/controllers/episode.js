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
                WatchListService.watch(slug, $scope.watchlistSelection);
                $state.go($state.current, slug, { reload: true });
            };

            $scope.unwatch = function() {
                WatchListService.unwatch(slug, $scope.watchlistSelection);
                $state.go($state.current, slug, { reload: true });
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
                    console.log(watchlist.result);
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

/*
    ng-click on watch button:   watch(episode.ids.trakt)
    ng-click on unwatch button: unwatch(episode.ids.trakt)
    ng-show on buttons: function returns true or false  
        watched(episode.ids.trakt) -> checks user watchlist to return result
*/