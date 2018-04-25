var createError = require('http-errors');
var express = require('express');
var proxy = require('express-http-proxy');
var path = require('path');
var logger = require('morgan');

var apiRouter = require('./routes/api').default;

var app = express();

app.use(logger('dev'));
app.use(express.json());

app.use('/api', apiRouter);
app.use('/', proxy('localhost:3001'));

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
