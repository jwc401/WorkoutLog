//Main page

//Mongoose setup
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Exercises = mongoose.model('Exercises');
var Entry = mongoose.model('Entry');
var Journal = mongoose.model('Journal');

//Express setup
var express = require('express');
var router = express.Router();


/* Get home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

//Get login page
router.get('/login', function(req, res) {
  res.render('login');
});

//Post to login page, to log in
router.post('/login', function(req,res,next) {
  passport.authenticate('local', function(err,user) {
    if(user) {
      req.logIn(user, function(err) {
        res.redirect('/');
      });
    } else {
      res.render('login', {message:'Your login or password is incorrect.'});
    }
  })(req, res, next);
});

//Get the register account page
router.get('/register', function(req, res) {
  res.render('register');
});


//Post to the register account page to create a new account
router.post('/register', function(req, res) {
  User.register(new User({username:req.body.username}), 
      req.body.password, function(err, user){
    if (err) { //Handle invalid register info
      res.render('register',{message:'Your registration information is not valid'});
    } else { //If info is fine, auto-login after creating
      passport.authenticate('local')(req, res, function() {
        res.redirect('/');
      });
    }
  });   
});


module.exports = router;

