var Trakt = require('trakt.tv');
var async = require('async');

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

        if (result) {
          return cb(null, result);
        }

        console.log('BEGIN SHOW SEARCH...')
        trakt.shows.summary({
          id: slug,
          extended: ['full', 'images']
        })
        .then(function(show) {

          var newShow = {};
          newShow.title = show.title;
          newShow.year = show.year;
          newShow.ids = show.ids;
          newShow.overview = show.overview;
          newShow.first_aired = show.first_aired;
          newShow.airs = show.airs;
          newShow.runtime = show.runtime;
          newShow.network = show.network;
          newShow.country = show.country;
          newShow.trailer = show.trailer;
          newShow.homepage = show.homepage;
          newShow.status = show.status;
          newShow.rating = Math.round(show.rating * 10) / 10;
          newShow.votes = show.votes;
          newShow.language = show.language;
          newShow.genres = show.genres;
          newShow.aired_episodes = show.aired_episodes;
          newShow.images = show.images;
          newShow.slug = slug;
          newShow.episode_ids = [];
          newShow.subscribers = [];

          newArr = [];
          console.log('BEGIN SEASON SEARCH...')
          trakt.seasons.summary({
            id: slug,
            extended: ['full', 'images']
          })
          .then(function(seasons) {
            // update show
            console.log('BEGIN SEASON LOOP SEARCH...')
            async.forEach(seasons, function(season, cback) {
              console.log('SEASON LOOP...', season.number)
              if (season.number) {
                  var obj = {
                      title: 'Season ' + season.number,
                      number: season.number,
                      rating: Math.round(season.rating * 10) / 10,
                      episode_count: season.episode_count,
                      aired_episodes: season.aired_episodes,
                      first_aired: season.first_aired,
                      overview: season.overview,
                      images: season.images,
                      episodes: []
                  }
                  newArr.push(obj);
              }
              cback();
            }, function(err) {
                if (err) return cb(err);
                console.log('FINISHED SEASON LOOP...')
                console.log('BEGIN SECOND SEASON LOOP...')
                async.forEach(newArr, function(season, cback) {
                  console.log('SECOND SEASON LOOP...', season.number)
                  var episodeCount = season.episode_count;
                  var count = 0;

                  async.whilst(
                    function() { return count < episodeCount; },
                    function(callback) {
                      console.log('LOOPING EPISODE...',count, episodeCount)
                      trakt.episodes.summary({
                        id: slug,
                        season: season.number,
                        episode: count + 1,
                        extended: ['images', 'full']
                      })
                      .then(function(result) {
                        console.log('PUSHING EPISODES...')
                        season.episodes.push(result);
                        newShow.episode_ids.push(result.ids.trakt.toString());
                        count++;
                        return callback(null, count);
                      })
                      .catch(function(err) {
                        return cb(err);
                      });
                    },
                    function(err, n) {
                      console.log('FINISH WHILST...')
                      cback();
                    }
                  );
                }, function(err) {
                  if (err) return cb(err);
                  //COMPLETE
                  newShow.seasons = newArr;
                  console.log('COMPLETING...')
                  Show.create(newShow, function(err, instance) {
                    if (err) return cb(err, null);
                    console.log('SHOW SAVED!')
                    return cb(null, instance);
                  });
                });
            });
          })
          .catch(function(err) {
            return cb(err, null);
          });
        })
        .catch(function(err) {
          return cb(err, null);
        });
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

  Show.remoteMethod(
    'findShow', 
    {
      accepts: [{ arg: 'slug', type: 'string' }],
      returns: { arg: 'result', type: 'object'},
      http: { path: '/find-show', verb: 'get' }
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