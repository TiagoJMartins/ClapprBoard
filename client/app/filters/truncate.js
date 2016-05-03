angular.module('MainApp')
.filter('truncate', function() {
	return function(value, chars) {
		if (!value) return '';

		var maxChars = parseInt(chars, 10);
		if (!maxChars) return value;
		if (value.length <= maxChars) return value;

		value = value.substr(0, maxChars);
		var lastSpace = value.lastIndexOf(' ');
		if (lastSpace > -1) {
			if (value.charAt(lastSpace - 1) == '.' || value.charAt(lastSpace - 1) == ',') {
				lastSpace = lastSpace - 1;
			}

			value = value.substr(0, lastSpace);
		}

		return value + '... ';
	};
});