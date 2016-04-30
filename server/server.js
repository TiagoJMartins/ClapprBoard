var loopback = require('loopback');
var boot = require('loopback-boot');
var logger = require('morgan');
var path = require('path');

var app = module.exports = loopback();

app.use(logger('dev'));
app.use(loopback.bodyParser.json({limit: 52428800}));
app.use(loopback.bodyParser.urlencoded({limit: 52428800, extended: true}));

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.start = function() {
  // start the web server
  return app.listen(server_port, server_ip_address, function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
