//Mongoose stuff for homework 06

var mongoose = require('mongoose'); //Mongoose
var URLSlugs = require('mongoose-url-slugs'); //URL Slugs

//Schemas go here:
//Exercises
var Exercises = new mongoose.Schema({
    name: {type: String, required: true},
    quantity: {type: Number, min: 1, required: true},
    intensity: {type: String, required: true}
});

//Journal Entries
var Entry = new mongoose.Schema({
  date: {type: Date, required: true},
  exercises: [Exercises],
  comments: {type: String, required: false}
});
Entry.plugin(URLSlugs('date')); //URL slug for the list, so that we can find and then navigate to that specific list later on

//Journals
var Journal = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  //date: {type: Date, required: true},
  //name: {type: String, required: true},
  entries: [Entry]
});



//Registers it so that the mongoos knows about it
mongoose.model('Exercises', Exercises);
mongoose.model('Entry', Entry);
mongoose.model('Journal', Journal);


mongoose.connect('mongodb://localhost:10131/exercisedb'); //Connects to the database

