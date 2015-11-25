//Create user page

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
  res.render('createUser');
});


router.post('/', function(req, res, next) { //Authentication still a work in progress, still fiddling around with it
	//Also create new user!!!
	var newUser = new User({
		exercises: [],
		journal: []
	});
	newUser.save(function(err, user, count) { //Saves the new list to the groups of lists
	});

	var newJournal = new Journal({ //Creates a new object with the properties of the new list
		entries: []
	});
	newJournal.save(function(err, journal, count) { //Saves the new list to the groups of lists
		res.redirect('/'); //Redirect to main page after creating the user's journal log
	});
});


module.exports = router;

