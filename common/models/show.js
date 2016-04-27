var Trakt = require('trakt.tv');

var trakt = new Trakt({
	client_id: '72411d2ac025c781f020d95b72596ee01897a8b53d13fcdcaef2531cf5d18488',
	client_secret: '4a24b5cd70c186831bde562b6fadb4672329e6cdcf443abb5df7087f55d91606',
	redirect_uri: null,
	api_url: null
});

var url = trakt.get_url();

module.exports = function(Show) {

  Show.findShow = function(slug, cb) {
  	Show.findOne({ where: { slug: slug } }, function(err, result) {
  		if (err) return cb(err, null);

  		return cb(null, result);
  	});
  };

  Show.remoteMethod(
  	'findShow', 
  	{
  		accepts: [{ arg: 'slug', type: 'string' }],
  		returns: { arg: 'result', type: 'object'},
  		http: { path: '/find-show', verb: 'get' }
  	}
  );


  Show.getFromTrakt = function(slug, cb) {
  	trakt.shows.summary({
  		id: slug,
  		extended: ['full', 'images']
  	})
  	.then(function(show) {
      cb(null, show);
    })
  	.catch(function(err) {
  		cb(err);
  	});
  };

  Show.remoteMethod(
  	'getFromTrakt', 
  	{
  		accepts: [{ arg: 'slug', type: 'string' }],
  		returns: { arg: 'result', type: 'object' },
  		http: { path: '/trakt/info', verb: 'get' }
  	}
  );


  Show.getSeasons = function(slug, cb) {
    // get seasons from trakt
  };

  Show.queryTrakt = function(query, cb) {
    trakt.search({
      type: 'show',
      query: query
    })
    .then(function(results) {
      cb(null, results);
    })
    .catch(function(err) {
      cb(err);
    });
  };

  Show.remoteMethod(
    'queryTrakt',
    {
      accepts: [{ arg: 'query', type: 'string' }],
      returns: { arg: 'results', type: 'object' },
      http: { path: '/trakt/query', verb: 'get' }
    }
  );

};

/**	Flow for handling show query.
*
*	1. Search Query of: "Breaking Bad".
*	2. "Breaking Bad" gets turned into slug.
*	3. "breaking-bad" is used as search term.
*		3.1. Retrieve results from Mongo to see if queried show exists.
*			3.1.1. Show exists: Return data.
*			3.1.2. Show doesn't exists: Call to trakt API.
*				3.1.2.1. API call successful: POST /api/Show and return it's data.
*				3.1.2.2. API call unsuccessful: Return error, show is not available.
*
**/