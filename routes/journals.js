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
	res.send("Journals");
  //res.render('index', { title: 'Express' });
});

router.get('/create', function(req, res, next) {
	res.send("Create New Journal Entry");
  //res.render('index', { title: 'Express' });
});

router.get('/:slug', function(req, res, next) {
	res.send("Specifc Journal Access");
  //res.render('index', { title: 'Express' });
});



module.exports = router;
