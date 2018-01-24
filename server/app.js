var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var cors = require('cors');
var LocalStrategy = require('passport-local').Strategy;

/**
 * import the configuration file for storing important data
 */
var config = require('./config');

/**
 * Setup connection to MongoDb Database
 */
mongoose.connect(config.mongoUrl);
var dataBase = mongoose.connection;
dataBase.on('error', console.error.bind(console, 'connection error..sir'));
dataBase.once('open', function () {
  console.log('Connected to MongoDB correctly');
});

/**
 * import routes
 */
var index = require('./routes/index');

var admin = require('./routes/admin/adminRouter')
var classifiedRouterAdmin = require('./routes/admin/classifiedRouterAdmin');
var userRouterAdmin = require('./routes/admin/usersRouterAdmin');

var app = express();

/**
 * view engine setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/**
 * setup morgan logger, favicon, bodyParser and cookieParser middlewares
 */
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * passport configuration
 */
var User = require('./models/userModel');
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.options('*', cors())

/**
 * access the routes
 */
app.use('/', index);

/** routes access by Admin */
app.use('/admin', admin);
app.use('/admin/classifieds', classifiedRouterAdmin);
app.use('/admin/users', userRouterAdmin);

/**
 * catch 404 and forward to error handler
 */
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * development environment error handler
 */
if (app.get('env')==='development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

/**
 * production error handler: no stack traces leaked to the user
 */
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;
