Applied Internet Tech Final Project


Jonathan Chua


*Note: All aspects of the final project listed here are subject to changes/modifications and may differ from the finished project*



Project Description:
	For this project, I intend to make a exercise training and monitoring site. On it, a user will be able to access the main page (directory). One thing they can do is create and modify their workout exercises, and is that is saved to them. Another thing that they can do is to create and maintain a journal of their workouts, on which they can enter a main journal page where they can either access previous journal entries or go and create a new journal entry in which they can report on how they did during their workout (can access information entered from the workout exercises page) via text and other methods. Potentially, I can add scripting for calculations (e.g. BMI and other such information) that can be tracked for the user.



Data Model:

```javascript
//Users
var User = new mongoose.Schema({
  // username, password provided by plugin
  exercises: [{type: mongoose.Schema.Types.ObjectId, ref: 'Exercises'}],
  journal:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Journal' }]
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
![Wireframe:](/docs/img/wireframe.png)


Site Map:
![Site Map:](/docs/img/sitemap.png)


User Stories:
*As an athlete, I want to keep careful track of my training so that I can perform at peak performance
*As a person who wants to lose weight, I want to have a record of my progress, exercise and weight loss, so that I can continue to motivate myself
*As a person who wants to become fitter, I want make sure that I follow my fitness goals so that I can get fitter and fitter


Potential modules/concepts to research: (Subject to change)
*Integrate user authentication
*Use a CSS framework throughout the site
*Using pre-built Express project templates
*
*
(3+1+1)
