//Journals

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
	//res.render('journals');
	Entry.find(function(err, entry, count) { //Displays all the entries
		res.render('journals', {entries: entry});
	});
});


router.post('/create', function(req, res, next) {
	//res.redirect('/journals/testingSlug');
	var newEntry = new Entry({ //Creates a new object with the properties of the new list
		date: req.body.date,
		exercises: [],
		comments: "Edit comments"
	});
	newEntry.save(function(err, entry, count) { //Saves the new list to the groups of lists
		res.redirect('303,'/journals/'+entry.slug'); //Redirect to specific journal page that was just created
	});
});


router.get('/:slug', function(req, res, next) {
	//res.render('entryDetails');
	Entry.findOne({slug: req.params.slug}, function(err, entry, count) { //Finds the specific list using the URL slug
		res.render('entryDetails', {date: entry.date}); //Displays that specific entry
	});
});



module.exports = router;
