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


//Get the main /journals page
router.get('/', function(req, res, next) {
	User.findOne({username: req.user.username}).populate('entry').exec(function(err, user) {
	    res.render('journals', {entries: user.entry});
  });
});


//Helps and handles the ajax sorting for the date)
router.get('/sort', function(req, res) {
	//res.send(req.user);
	//console.log(req.user);
	var queryDate = req.query.mmddyy;
	var query = req.query; //Is returned as an empty object for some reason...
	console.log(queryDate);
	var hold = [];
	User.findOne({username: req.user.username}).populate('entry').exec(function(err, user) { //Finds the user
	    var count = 0;
	    if (user.entry[0].date != undefined) { 
	    	do { //Checks through all the user's journal entries
	    		hold.push(user.entry[count]); //Initial plan was to find the specific entry that matches the date, but had this weird glitch where req.query, req.body and the like were not being taken in, so I had to do the rest on the route page
	    		count++;
		    }
		    while (user.entry[count] != undefined);
	    }
	    res.send(hold); //Sends the entries off to the route page
  	});
});


//Posts and creates a new journal entry page before redirecting the user to it
router.post('/create', function(req, res, next) {
  	var dateIn = req.body.date;
  	var month = dateIn.slice(0,2);
  	var day = dateIn.slice(2,4);
  	var year = dateIn.slice(4,6);
  	var dateIn = month + "-" + day + "-" + year;
  	var exerciseSet = [];
  	User.findOne({username: req.user.username}).populate('exercises').exec(function(err, user) {
  		var count=0;
	    while (user.exercises[count] != undefined) { //Stores the current list of exercises the user is doing at that time
	    	//var exUser = req.user._id;
	    	var exName = user.exercises[count].name;
	    	var exQuantity = user.exercises[count].quantity;
	    	var exIntensity = user.exercises[count].intensity;
	    	var exChecked = false;
	    	exerciseSet.push({user: req.user._id, name: exName, quantity: exQuantity, intensity: exIntensity, checked: exChecked});
	    	count++;
	    }
		//console.log(exerciseSet);
      	var newEntry = new Entry({ //Creates a new object with the properties of the new list
			user: req.user._id,
			date: dateIn,
			//exercises: [],
			exercises: exerciseSet, //That previously mentioned current list of exercises
			comments: "Edit comments",
			//checked: false
		});
		//Save set of exercises into the entry!
		newEntry.save(function(err, saveEntry, count) { //Saves the new entry to the groups of entries in user
			//console.log(err);
			req.user.entry.push(saveEntry._id);
		    req.user.save(function(err, saveUser, count) {
		    	res.redirect('/journals/'+dateIn);
		    });
		}); 
  	});
});


//Get and display the page for the specific journal entry
router.get('/:slug', function(req, res, next) {
	User.findOne({username: req.user.username}).populate('entry').exec(function(err, user) {
		var foundEntry;
		var commentNow;
		var count = 0;
		while (user.entry[count] != undefined) {
			if (user.entry[count].slug == req.params.slug) {
				foundEntry = user.entry[count].exercises;
				commentNow = user.entry[count].comments;
			}
			count++;
		}
	    res.render('entryDetails', {exercises: foundEntry, slug: req.params.slug, commentRead: commentNow});
  	});
});


//Posts, handles checking off exercises the user has finished in the checklist of exercises on that journal entry page
router.post('/check', function(req, res, next) {
	User.findOne({username: req.user.username}).populate('entry').exec(function(err, user) {
		var foundEntry; //Speciic entry we are looking at
		var count = 0;
		while (user.entry[count] != undefined) { //Finds the specific entry
			if (user.entry[count].slug == req.body.slug) {
				foundEntry = user.entry[count];
				break;
			}
			count++;
		}
		var checkItems = req.body; //Takes in the request body as an object
		for (var i=0; i<foundEntry.exercises.length; i++) { //Check through the response body object to see if any of the items in the list were checked off
			var check = foundEntry.exercises[i].name.split(" ");
			if (checkItems.hasOwnProperty(check[0])) { //Filter by first word. I can't get words with spaces in them to get crossed off otherwise
				foundEntry.exercises[i].checked = true;
			}
		}
		console.log(foundEntry.exercises);
		user.entry[count].markModified('exercises'); //Note that we have modified the items inside it
		user.entry[count].save(function(err, userl) {
			res.redirect('/journals/'+foundEntry.slug);
		});
	});
});


//Modifies the comment section on the journal entry page to whatever the user types into the textarea field
router.post('/modEntry', function(req, res, next) {
	var comment = req.body.comments;
	console.log(comment);
	console.log(req.body.slug);
	User.findOne({username: req.user.username}).populate('entry').exec(function(err, user) {
		var foundEntry;
		var count = 0;
		while (user.entry[count] != undefined) {
			if (user.entry[count].slug == req.body.slug) {
				foundEntry = user.entry[count];
				break;
			}
			count++;
		}
		console.log(foundEntry.comments);
		foundEntry.comments = comment;
		console.log(foundEntry.comments);
		user.entry[count].markModified('comments'); //Note that we have modified the items inside it
		user.entry[count].save(function(err, userl) {
			res.redirect('/journals/'+foundEntry.slug);
		});
  	});
})



module.exports = router;
