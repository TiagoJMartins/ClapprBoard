angular.module('MainApp')
	.controller('DetailCtrl', ['$scope', '$rootScope', 'ShowService', '$state',
		function($scope, $rootScope, ShowService, $state) {

			$scope.slug = $state.params.id;
			$scope.working = true;
			$scope.show = {};

			ShowService.findShow.get({ slug: $scope.slug }, function(data) {

				if(!data.result) {
					$rootScope.error = "The requested show could not be retrieved.";
					$scope.working = false;
					return;
				}

				$scope.show = data.result;
				$scope.time = moment();
				$scope.rating = Math.round(data.result.rating * 10) / 10;
				$rootScope.error = '';
				$scope.working = false;
				return;
			});

		}
	]);