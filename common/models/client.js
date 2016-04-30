module.exports = function(Client) {

	Client.watch = function(user_id, slug, ep_id, cb) {
		Client.findById(user_id, function(err, user) {
			if (err) {
				cb(err, null);
			}

			cb(null, user);
		});
	}

	Client.remoteMethod(
		'watch',
		{
		  accepts: [
	        { arg: 'user_id', type: 'string'},
	        { arg: 'slug', type: 'string' },
	        { arg: 'ep_id', type: 'string' }
      	  ],
      	  returns: { arg: 'result', type: 'object' },
      	  http: { path: '/watch', verb: 'post' }
		}
	);
};

/*

5723b128ab80c59407fc9767

*/