//Exercises

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


/* Get exercises page. */
router.get('/', function(req, res, next) {
	User.findOne({username: req.user.username}).populate('exercises').exec(function(err, user) {
	    res.render('exercises', {exercises: user.exercises});
  });
});


//Post new exercise to the page and save it to the exercises schema inside user
router.post('/', function(req, res, next) {
	var newExercise = new Exercises({ //New exercise with these parameters
	  	user: req.user._id,
	  	name: req.body.name,
	  	quantity: req.body.quantity,
	  	intensity: req.body.intensity,
	  	checked: false
  	});
  	newExercise.save(function(err, saveExercise, count) { //Save the new exercise into the schema
	    req.user.exercises.push(saveExercise._id);
	    req.user.save(function(err, saveUser, count) {
	      res.redirect('/exercises'); //Redirect back to the exercise page
	    });
  	});
});



module.exports = router;








