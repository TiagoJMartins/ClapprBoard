var async = require('async');

module.exports = function(WatchList) {

	WatchList.watch = function(user_id, show_slug, episodes, cb) {
		WatchList.findOrCreate(
		{
			where: {
				user_id: user_id
			}
		},
		{
			user_id: user_id,
			shows: {}
		}, 
		function(err, instance) {
			if (err) {
				cb(err, null);
				return;
			}

			if (!instance.shows[show_slug]) {
				instance.shows[show_slug] = [];
			}

			async.forEach(episodes, function(episode, callback) {

				if (instance.shows[show_slug].indexOf(episode) === -1) {
					instance.shows[show_slug].push(episode);
				}
				callback();

			}, function(err) {
				if (err) {
					cb(err, null);
					return;
				}

				instance.save(function(err, succ) {
					if (err) {
						cb(err, null);
						return;
					}
					cb(null, 200);
				});

			});
		
		});
	};

	WatchList.unwatch = function(user_id, show_slug, episodes, cb) {
		WatchList.findOne({
			where: {
				user_id: user_id
			}
		}, function(err, instance) {
			if (err) {
				cb(err, null);
				return;
			}

			if (!instance) {
				cb(null, 'no watchlist found');
				return;
			}

			if (!instance.shows[show_slug]) {
				cb(null, 'show does not exist in watchlist');
				return;
			}

			async.forEach(episodes, function(episode, callback) {

				var index = instance.shows[show_slug].indexOf(episode);
				if (index !== -1) {
					instance.shows[show_slug].splice(index, 1);
				}

				callback();
			}, function(err) {
				if (err) {
					cb(err, null);
					return;
				}

				instance.save(function(err, succ) {
					if (err) {
						cb(err, null);
						return;
					}
					cb(null, 200);
				});	
			});
		});
	}

	WatchList.hasWatched = function(user_id, show_slug, cb) {
		WatchList.findOne({
			where: {
				user_id: user_id
			}
		}, function(err, instance) {
			if (err) {
				cb(err, null);
				return;
			}

			if (!instance || !instance.shows[show_slug]) {
				cb(null, null);
				return;
			}

			cb(null, instance.shows[show_slug]);
		});
	}

	WatchList.remoteMethod(
		'watch',
		{
			accepts: [
		        { arg: 'user_id', type: 'string'},
		        { arg: 'show_slug', type: 'string' },
		        { arg: 'episodes', type: 'array' }
      		],
      		returns: { arg: 'result', type: 'object' },
      		http: { path: '/add', verb: 'post' }
		}
	);

	WatchList.remoteMethod(
		'unwatch',
		{
			accepts: [
		        { arg: 'user_id', type: 'string'},
		        { arg: 'show_slug', type: 'string' },
		        { arg: 'episodes', type: 'array' }
      		],
      		returns: { arg: 'result', type: 'object' },
      		http: { path: '/remove', verb: 'post' }
		}
	);

	WatchList.remoteMethod(
		'hasWatched',
		{
			accepts: [
		        { arg: 'user_id', type: 'string' },
		        { arg: 'show_slug', type: 'string' }
      		],
      		returns: { arg: 'result', type: 'array' },
      		http: { path: '/watched', verb: 'get' }
		}
	);

};