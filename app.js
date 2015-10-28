"use strict";

var express = require('express');
var path = require('path'); 
var favicon = require('serve-favicon');
var passport = require('passport');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
//var authController = require('./controllers/auth');

//var routes = require('./routes');
//console.log(routes);
var routes = require('./routes/index');
var login = require('./routes/login');
var user = require('./routes/user');
var directory = require('./routes/directory');
var artist = require('./routes/artist');
var album = require('./routes/album');
var track = require('./routes/track');
var genre = require('./routes/genre');
var scan = require('./routes/scan');

var models = require("./models"); 

var app = express();

models.sequelize.sync();

require('./config/passport')(passport);

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
//app.use(express.static(__dirname + '/public')); 

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('connect-multiparty')());
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'zomaareefdssdnstukjetekstDatjenietzomaarbedenkt',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/login', login);
app.use('/user', user);//authController.isAuthenticated, 
app.use('/directory', directory);
app.use('/artist', artist);
app.use('/album', album);
app.use('/track', track);
app.use('/genre', genre);
app.use('/scan', scan);
app.get('/logout', function(req, res) {
  req.logout();
  res.json(true);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
