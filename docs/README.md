Applied Internet Tech Final Project


Jonathan Chua


*Note: All aspects of the final project listed here are subject to changes/modifications and may differ from the finished project*



Project Description:
	For this project, I intend to make a exercise training and monitoring site. On it, a user will be able to access the main page (directory). One thing they can do is create and modify their workout exercises, and is that is saved to them. Another thing that they can do is to create and maintain a journal of their workouts, on which they can enter a main journal page where they can either access previous journal entries or go and create a new journal entry in which they can report on how they did during their workout (can access information entered from the workout exercises page) via text and other methods.



Data Model:

```javascript
//Users
var User = new mongoose.Schema({
  // username, password provided by plugin
  lists:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }]
});


//Workout Exercises
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

//Journals
var Journal = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  date: {type: Date, required: true},
  name: {type: String, required: true},
  entries: [Entry]
});
```



Wireframes:



Potential modules/concepts to research: (Subject to change)




Requirements:
-Use express & mongoDB
-Have at least 5 route handlers (do not count login/register gets and posts if doing auth)
-Have around 4 mongoose schemas
-Have at least 2 forms
-External CSS styling
-Use external javascript files for client-side javascript