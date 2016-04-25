angular.module('MainApp')
  .controller('MainCtrl', ['$scope', '$rootScope', 'ShowService', 'Show',
    function($scope, $rootScope, ShowService, Show) {
      $scope.headingTitle = "Titleeeee";

      $scope.working = false;

      Show.find({
      	filter: {
      		limit: 16
      	}
      }, function(results) {
      	$scope.working = true;
      	$scope.panelBody = results;
      	$scope.working = false;
      });

      $scope.find = function() {
            $scope.panelBody = '';
      	$scope.working = true;

      	if (!$scope.query) {
      		$scope.panelBody = {error: 'Please enter a search query.'};
      		$scope.working = false;
      		return;
      	}

      	var slug = $scope.query
      				.toLowerCase()
      				.replace(/ /g, '-');

      	ShowService.findShow.get({ slug: slug }, function(result) {
      		if (!result.result) {
                        ShowService.trakt.find.get({ slug: slug }, function(result) {
                              if (result.error) {
                                    $scope.panelBody = {error: "Show has not been found."};
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
                                    newShow.rating = data.rating;
                                    newShow.votes = data.votes;
                                    newShow.language = data.language;
                                    newShow.genres = data.genres;
                                    newShow.aired_episodes = data.aired_episodes;
                                    newShow.images = data.images;
                                    newShow.slug = slug;

                                    $scope.panelBody = Show.create(newShow);
                                    $scope.query = '';
                                    $scope.working = false;
                                    return;
                              }
                        });
      		} else {
            		$scope.panelBody = result.result;
            		$scope.query = '';
            		$scope.working = false;
                  }
      	});
      }

}]);
