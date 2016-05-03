angular.module('MainApp')
	.directive('comparePassword', function(){
		// Runs during compile
		return {
			require: 'ngModel',
			scope: {
				otherValue: "=comparePassword"
			},
			link: function(scope, elm, attrs, ctrl) {
				
				ctrl.$validators.comparePassword = function(val) {
					return val == scope.otherValue;
				};

				scope.$watch('otherValue', function() {
					ctrl.$validate();
				});

			}
		};
	});