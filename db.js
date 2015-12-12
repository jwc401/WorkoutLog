//Mongoose stuff for homework 06

var mongoose = require('mongoose'); //Mongoose
var URLSlugs = require('mongoose-url-slugs'); //URL Slugs
var passportLocalMongoose = require('passport-local-mongoose'); //Passport used for authentication


//Schemas go here:
//User schema
var User = new mongoose.Schema({
  exercises: [{type: mongoose.Schema.Types.ObjectId, ref:'Exercises'}], //Holds all the user's exercises
  entry: [{type: mongoose.Schema.Types.ObjectId, ref:'Entry'}] //Holds all the user's journal entries
});

//Exercises schema
var Exercises = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  name: {type: String, required: true},
  quantity: {type: Number, min: 1, required: true},
  intensity: {type: String, required: true},
  checked: {type: Boolean, required: true}
});

//Journal Entries schema
var Entry = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  //date: {type: Date, required: true}, //Normal date stuff was too finicky and glitchy, so I just used a string
  date: {type: String, required: true},
  exercises: [Exercises],
  comments: {type: String, required: false}
});
Entry.plugin(URLSlugs('date')); //URL slug for the entry, so that we can find and then navigate to that specific entry later on

//Journals //Phased out, was redundant
var Journal = new mongoose.Schema({
  //user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  date: {type: Date, required: true},
  name: {type: String, required: true},
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

