var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var success = require('./middleware/success');
var failed = require('./middleware/failed');
var images = require('./middleware/images');
var submitFormData = require('./middleware/submitFormData');
var submitFormDataAlert = require('./middleware/submitFormDataAlert');
var bioId = require('./middleware/bioId');
var getPostData = require('./middleware/getPostData');
var deletePostData = require('./middleware/deletePostData');
var twoStepTest = require('./middleware/twoStepTest');
var twoStepTwo = require('./middleware/twoStepTwo');
var twoStepSubmit = require('./middleware/twoStepSubmit');
var solveRecaptcha = require('./middleware/solveRecaptcha');
var solveNewRecaptcha = require('./middleware/solveNewRecaptcha');

var app = express();

var VIEWS_DIR = '../client/views/';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './client', 'public')));

app.get('/', function(req, res) {
  res.render(VIEWS_DIR + 'home');
});

app.get('/success', success);
app.get('/failed', failed);
app.get('/images', images);
app.post('/submitFormData', submitFormData);
app.post('/submitFormDataAlert', submitFormDataAlert);
app.get('/postData', getPostData);
app.post('/postData', deletePostData);
app.post('/twoStepTest', twoStepTest);
app.get('/twoStepTwo', twoStepTwo);
app.post('/twoStepSubmit', twoStepSubmit);
app.post('/solveRecaptcha', solveRecaptcha);
app.post('/solveNewRecaptcha', solveNewRecaptcha);
app.get('/:bioId', bioId);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// will print stacktrace
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render(VIEWS_DIR + 'failed', {
    message: err.message,
    error: err
  });
});


module.exports = app;
