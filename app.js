var express = require('express');
var path = require('path');
var log = require('./lib/log');

var app = express();

var routes = require('./lib/routes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.raw({
  // XML workaround
  type: function(req){
    return req.headers['content-type'] && req.headers['content-type'].toLowerCase().includes('xml')
  }
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',
  express.static(path.join(__dirname,'bower_components')));

app.use('/',routes(express.Router()));

// Start Server

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  console.log('NOT FOUND: '+req.url);
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

var server = app.listen(process.env.PORT || 4242, function() {
  log.info('start', 'port', server.address().port);
});


module.exports = server;