var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



//Mongoose stuff
require('./db'); //Database
require('./auth'); //Authentication
var mongoose = require('mongoose');
var passport = require('passport');
var Exercises = mongoose.model('Exercises');
var Entry = mongoose.model('Entry');
var Journal = mongoose.model('Journal');


var routes = require('./routes/index');
//var users = require('./routes/users');
var exercises = require('./routes/exercises');
var journals = require('./routes/journals');
//var login = require('./routes/login');
//var userCreate = require('./routes/userCreate');

var app = express();


//Session support for Authentication
var session = require('express-session');
var sessionOptions = {
  secret: 'secret cookie thang (store this elsewhere!)',
  resave: true,
  saveUninitialized: true
};
app.use(session(sessionOptions));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Use passport and enable sessions
app.use(passport.initialize());
app.use(passport.session());

//Makes user data available for all templates
app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
});


app.use('/', routes);
//app.use('/users', users);
app.use('/exercises', exercises);
app.use('/journals', journals);
//app.use('/login', login);
//app.use('/userCreate', userCreate);


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

app.listen(10130);
console.log('Server started on port 10130');

