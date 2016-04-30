var Trakt = require('trakt.tv');

var trakt = new Trakt({
	client_id: '72411d2ac025c781f020d95b72596ee01897a8b53d13fcdcaef2531cf5d18488',
	client_secret: '4a24b5cd70c186831bde562b6fadb4672329e6cdcf443abb5df7087f55d91606',
	redirect_uri: null,
	api_url: null
});

var url = trakt.get_url();

module.exports = function(Show) {

  /*************/
  /* Trakt API */
  /*************/

  Show.findShow = function(slug, cb) {
  	Show.findOne({ where: { slug: slug } }, function(err, result) {
  		if (err) return cb(err, null);

  		return cb(null, result);
  	});
  };


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


  Show.getSeasons = function(slug, cb) {
    trakt.seasons.summary({
      id: slug,
      extended: ['full', 'images']
    })
    .then(function(results) {
      cb(null, results);
    })
    .catch(function(err) {
      cb(err);
    });
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

  Show.getEpisodes = function(slug, season, episode, cb) {
    trakt.episodes.summary({
      id: slug,
      season: season,
      episode: episode,
      extended: ['images', 'full']
    })
    .then(function(result) {
      cb(null, result);
    })
    .catch(function(err) {
      cb(err);
    });
  }

  Show.remoteMethod(
    'findShow', 
    {
      accepts: [{ arg: 'slug', type: 'string' }],
      returns: { arg: 'result', type: 'object'},
      http: { path: '/find-show', verb: 'get' }
    }
  );

  Show.remoteMethod(
    'getFromTrakt', 
    {
      accepts: [{ arg: 'slug', type: 'string' }],
      returns: { arg: 'result', type: 'object' },
      http: { path: '/trakt/info', verb: 'get' }
    }
  );

  Show.remoteMethod(
    'getSeasons',
    {
      accepts: [{ arg: 'id', type: 'string' }],
      returns: { arg: 'results', type: 'object'},
      http: { path: '/trakt/seasons', verb: 'get' }
    }
  );

  Show.remoteMethod(
    'queryTrakt',
    {
      accepts: [{ arg: 'query', type: 'string' }],
      returns: { arg: 'results', type: 'object' },
      http: { path: '/trakt/query', verb: 'get' }
    }
  );

  Show.remoteMethod(
    'getEpisodes',
    {
      accepts: [
        { arg: 'slug', type: 'string'},
        { arg: 'season', type: 'number' },
        { arg: 'episode', type: 'number' }
      ],
      returns: { arg: 'result', type: 'object' },
      http: { path: '/trakt/episodes', verb: 'get' }
    }
  );

  /**********************/
  /* Show Subscriptions */
  /**********************/

  Show.subscribe = function(user_id, show_slug, cb) {
    Show.findOne({
      where: {
        slug: show_slug
      }
    }, function(err, show) {
      if (err) {
        cb(err, null);
      }

      if (show.subscribers.indexOf(user_id) !== -1) {
        cb(null, 'user already subscribed');
        return;
      }

      show.subscribers.push(user_id);
      show.save(function(err) {
        if (err) {
          cb(err, null);
        }
        cb(null, 'success');
      });
    });
  };

  Show.unsubscribe = function(user_id, show_slug, cb) {
    Show.findOne({
      where: {
        slug: show_slug
      }
    }, function(err, show) {
      if (err) {
        cb(err, null);
      }

      if (show.subscribers.indexOf(user_id) === -1) {

        cb(null, 'user is not subscribed to this show');
        return;
      }

      var userIndex = show.subscribers.indexOf(user_id);
      show.subscribers.splice(userIndex, 1);
      show.save(function(err) {
        if (err) {
          cb(err, null);
        }

        cb(null, 'success');
      });
    });
  };

  Show.remoteMethod(
    'subscribe',
    {
      accepts: [
        { arg: 'user', type: 'string' },
        { arg: 'show', type: 'string' }
      ],
      returns: { arg: 'resp', type: 'object' },
      http: { path: '/subscribe', verb: 'post' }
    }
  );

  Show.remoteMethod(
    'unsubscribe',
    {
      accepts: [
        { arg: 'user', type: 'string' },
        { arg: 'show', type: 'string' }
      ],
      returns: { arg: 'resp', type: 'object' },
      http: { path: '/unsubscribe', verb: 'post' }
    }
  );
};