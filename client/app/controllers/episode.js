angular.module('MainApp')
    .controller('EpisodeCtrl', ['$scope', 'ShowService', '$state', 'Show', '$rootScope', 'WatchListService',
        function($scope, ShowService, $state, Show, $rootScope, WatchListService) {

            var slug = $state.params.id;
            $scope.show = {};
            $rootScope.error = '';
            $scope.tab = 1;

            $scope.setTab = function(pos) {
            	$scope.tab = pos;
            };

/*            Show.findOne({
                filter: {
                    where: {
                        slug: slug
                    }
                }
            }, function(data) {
                var show = data.result;

                if (!show) {
                    $rootScope.error = 'The information requested could not be retrieved.';
                    return;
                }

                $scope.subscribed = ShowService.util.isSubscribed(show.subscribers);
                $scope.show = show;
                return;
            });*/

            ShowService.findShow.get({ slug: slug }, function(data) {
            if(!data.result) {
                $rootScope.error = 'Requested show could not be found.';
                return;
            }

              $scope.subscribed = ShowService.util.isSubscribed(data.result.subscribers);
              $scope.show = data.result;
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