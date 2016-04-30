angular.module('MainApp')
.controller('DetailCtrl', ['$scope', '$rootScope', 'ShowService', '$state', 'Show',
	function($scope, $rootScope, ShowService, $state, Show) {

		$scope.slug = $state.params.id;
		$scope.show = {};
            $scope.isSubscribed = function(subscribers) {
                  return ShowService.util.isSubscribed(subscribers);
            }

		ShowService.findShow.get({ slug: $scope.slug }, function(data) {
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