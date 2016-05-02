angular.module('MomentFilters', [])
	.filter('fromNow', function() {
		return function(date) {
			if (date) {
				var target = date.slice(0, date.length - 1);
				return moment(target).fromNow();
			}
		}
	})
	.filter('parseDate', function() {
		return function(date) {
			if (date) {
				var target = date.slice(0, date.length - 1);
				var format = 'LLLL';
				return moment(target).format(format);
			}
		}
	})