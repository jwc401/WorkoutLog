//Exercises

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
	//res.send("View and edit exercises page");
	res.render('exercises');
});


router.post('/', function(req, res, next) {
	//Modify the exercise
	res.redirect('/exercises');
});

module.exports = router;
