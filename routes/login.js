//Login page

//Mongoose setup
var mongoose = require('mongoose');
var Exercises = mongoose.model('Exercises');
var Entry = mongoose.model('Entry');
var Journal = mongoose.model('Journal');

//Express setup
var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res, next) {
	//Insert login stuff happening, work in progress
	res.redirect('/');
});


module.exports = router;

