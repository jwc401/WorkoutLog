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
	var query = req.query; //Is returned as an empty object for some reason...
	console.log(queryDate);
	var hold = [];
	User.findOne({username: req.user.username}).populate('entry').exec(function(err, user) {
	    var count = 0;
	    if (user.entry[0].date != undefined) {
	    	do {
	    		hold.push(user.entry[count])	;
	    		count++;
		    }
		    while (user.entry[count] != undefined);
	    }
	    res.send(hold);
  	});
});


router.post('/create', function(req, res, next) {
  	var dateIn = req.body.date; //DO THE CLIENT SIDED VALIDATION TO SEE IF THIS IS A VALID DATE
  	var month = dateIn.slice(0,2);
  	var day = dateIn.slice(2,4);
  	var year = dateIn.slice(4,6);
  	var dateIn = month + "-" + day + "-" + year;
  	var exerciseSet = [];
  	User.findOne({username: req.user.username}).populate('exercises').exec(function(err, user) {
  		var count=0;
	    while (user.exercises[count] != undefined) {
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
			exercises: exerciseSet,
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


router.get('/:slug', function(req, res, next) {
	//console.log(req.params.slug);
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


router.post('/check', function(req, res, next) {
	User.findOne({username: req.user.username}).populate('entry').exec(function(err, user) {
		var foundEntry; //Speciic entry we are looking at
		var count = 0;
		while (user.entry[count] != undefined) {
			if (user.entry[count].slug == req.body.slug) {
				foundEntry = user.entry[count];
				break;
			}
			count++;
		}
		var checkItems = req.body; //Takes in the request body as an object
		//console.log(req.body);
		for (var i=0; i<foundEntry.exercises.length; i++) { //Check through the response body object to see if any of the items in the list were checked off
			var check = foundEntry.exercises[i].name.split(" ");
			//if (checkItems.hasOwnProperty(list.items[i].name)) { //If the checkbox was ticked off in the form
			//	list.items[i].checked = true; //Check off the item
			//}
			if (checkItems.hasOwnProperty(check[0])) { //Filter by first word. I can't get words like "ice cream" or other words with spaces in them to get crossed off otherwise
				foundEntry.exercises[i].checked = true;
			}
		}
		console.log(foundEntry.exercises);
		user.entry[count].markModified('exercises'); //Note that we have modified the items inside it
		user.entry[count].save(function(err, userl) {
			res.redirect('/journals/'+foundEntry.slug);
		});
		//res.redirect('back');
	});
});


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
