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


/* GET home page. */
router.get('/', function(req, res, next) {
	User.findOne({username: req.user.username}).populate('exercises').exec(function(err, user) {
	    res.render('exercises', {exercises: user.exercises});
  });
});



router.post('/', function(req, res, next) {
	var newExercise = new Exercises({
	  	user: req.user._id,
	  	name: req.body.name, //MODIFY TO FIX IT IF req.body IS NOT CORRECT
	  	quantity: req.body.quantity,
	  	intensity: req.body.intensity,
	  	checked: false
  	});
  	newExercise.save(function(err, saveExercise, count) {
	    req.user.exercises.push(saveExercise._id);
	    req.user.save(function(err, saveUser, count) {
	      res.redirect('/exercises');
	    });
  	});
});



module.exports = router;








