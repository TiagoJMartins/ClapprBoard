angular.module('MainApp')
  .controller('MainCtrl', ['$scope', '$rootScope', 'ShowService', 'Show', '$alert', 
    function($scope, $rootScope, ShowService, Show, $alert) {

      $scope.working = true;
      $rootScope.error = '';

      Show.find({
      	filter: {
      		limit: 16
      	}
      }, function(results) {
      	$rootScope.error = '';
      	$scope.panelBody = results;
      	$scope.working = false;
      });

      $scope.find = function() {
      	$scope.working = true;
      	$rootScope.error = '';
            var resArray = [];

      	if (!$scope.query) {
      		$rootScope.error = 'Please enter a search query.'
      		$scope.working = false;
      		return;
      	}

            ShowService.trakt.query.get({ query: $scope.query }, function(res) {
                  if (!res.results.length) {
                        $rootScope.error = 'No results found for "' + $scope.query + '".';
                        $scope.working = false;
                        return;
                  }

                  for (var i = 0; i < res.results.length; i++) {
                        var obj = {
                              title: res.results[i].show.title,
                              images: res.results[i].show.images,
                              slug: res.results[i].show.ids.slug
                        };

                        if (obj.images.poster.thumb) {
                              resArray.push(obj);
                        } else { continue; }
                  }

                  $scope.panelBody = resArray;
                  $scope.query = '';
                  $scope.working = false;
                  return;
            });
      }

}]);
