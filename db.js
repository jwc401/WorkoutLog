//Mongoose stuff for homework 06

var mongoose = require('mongoose'); //Mongoose
var URLSlugs = require('mongoose-url-slugs'); //URL Slugs
var passportLocalMongoose = require('passport-local-mongoose'); //Passport used for authentication


//Schemas go here:
//User schema
var User = new mongoose.Schema({
  exercises: [{type: mongoose.Schema.Types.ObjectId, ref:'Exercises'}], //Put this before or after their definition in db.js???
  entry: [{type: mongoose.Schema.Types.ObjectId, ref:'Entry'}]
});

//Exercises
var Exercises = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  name: {type: String, required: true},
  quantity: {type: Number, min: 1, required: true},
  intensity: {type: String, required: true}
});

//Journal Entries
var Entry = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  //date: {type: Date, required: true},
  date: {type: String, required: true},
  exercises: [Exercises],
  comments: {type: String, required: false}
});
Entry.plugin(URLSlugs('date')); //URL slug for the list, so that we can find and then navigate to that specific list later on

//Journals
var Journal = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  //user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  //date: {type: Date, required: true},
  //name: {type: String, required: true},
  entries: [Entry]
});



// NOTE: we're using passport-local-mongoose as a plugin
// our schema for user looks pretty thin... but that's because
// the plugin inserts salt, password and username
User.plugin(passportLocalMongoose);




//Registers it so that the mongoos knows about it
mongoose.model('Exercises', Exercises);
mongoose.model('Entry', Entry);
mongoose.model('Journal', Journal);
mongoose.model('User', User); //Need this? One example uses, other doesn't


mongoose.connect('mongodb://localhost/exercisedb'); //Connects to the database

