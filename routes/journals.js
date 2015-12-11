//Journals

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



router.get('/', function(req, res, next) {
	User.findOne({username: req.user.username}).populate('entry').exec(function(err, user) {
	    res.render('journals', {entries: user.entry});
  });
});

router.get('/sort', function(req, res) {
	//res.send(req.user);
	//console.log(req.user);
	var queryDate = req.query.mmddyy;
	console.log(queryDate);
	var hold = [];
	User.findOne({username: req.user.username}).populate('entry').exec(function(err, user) {
	    //res.render(''entryDetails', {exercises: user.exercises}');
	    var count = 0;
	    if (user.entry[0].date != undefined) {
	    	do {
	    		var entryDate = user.entry[count].date;
	    		//if (req.query.mmddyy == entryDate) {
	    			hold.push(entryDate);
	    			//hold.push(user.entry[count]);
	    		//}
	    		count++;
		    }
		    while (user.entry[count] != undefined);
	    }
	    res.send(hold);
  	});

	/*
	var entryFilter = {};
	var searchExists = false;
	var dateIn = req.query.mmddyy; //DO THE CLIENT SIDED VALIDATION TO SEE IF THIS IS A VALID DATE
  	var month = dateIn.slice(0,2);
  	var day = dateIn.slice(2,4);
  	var year = dateIn.slice(4,6);
  	dateIn = month + "-" + day + "-" + year;
	entryFilter.mmddyy = dateIn; 

	User.findOne({username: req.user.username}).populate('exercises').exec(function(err, user) {
	    //res.render('entryDetails', {exercises: user.exercises});
  	}); */
  	/*
	Entry.find(entryFilter, function(err, entries, count) {
		res.render('journals', {'entries': entries, searchExists: searchExists});
		//res.send(movies);
	});*/
});


router.post('/create', function(req, res, next) {
  	var dateIn = req.body.date; //DO THE CLIENT SIDED VALIDATION TO SEE IF THIS IS A VALID DATE
  	var month = dateIn.slice(0,2);
  	var day = dateIn.slice(2,4);
  	var year = dateIn.slice(4,6);
  	var dateIn = month + "-" + day + "-" + year;
  	var newEntry = new Entry({ //Creates a new object with the properties of the new list
		user: req.user._id,
		date: dateIn,
		exercises: [],
		comments: "Edit comments"
	});

	//Save set of exercises into the entry!

	newEntry.save(function(err, saveEntry, count) { //Saves the new list to the groups of lists
		req.user.entry.push(saveEntry._id);
	    req.user.save(function(err, saveUser, count) {
	    	res.redirect('/journals/'+dateIn);
	    });
	}); 
});


router.get('/:slug', function(req, res, next) {
	User.findOne({username: req.user.username}).populate('exercises').exec(function(err, user) {
	    res.render('entryDetails', {exercises: user.exercises});
  	});
});

router.post('/modEntry', function(req, res, next) {
	User.findOne({username: req.user.username}).populate('exercises').exec(function(err, user) {
	    res.redirect('back');
  	});
})



module.exports = router;
