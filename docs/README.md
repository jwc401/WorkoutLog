Applied Internet Tech Final Project


Jonathan Chua


*Note: All aspects of the final project listed here are subject to changes/modifications and may differ from the finished project*



Project Description:
	For this project, I intend to make a exercise training and monitoring site. On it, a user will be able to access the main page (directory). One thing they can do is create and modify their workout exercises, and is that is saved to them. Another thing that they can do is to create and maintain a journal of their workouts, on which they can enter a main journal page where they can either access previous journal entries or go and create a new journal entry in which they can report on how they did during their workout (can access information entered from the workout exercises page) via text and other methods. Potentially, I can add scripting for calculations (e.g. BMI and other such information) that can be tracked for the user.



Data Model:

```javascript
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
  intensity: {type: String, required: true},
  checked: {type: Boolean, required: true}
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

//Journals (I ended up phasing this out, as it ended up being unneeded and redundant, the others work well enough to keep track of themselves, don't need this seperate tracking schema as well)
var Journal = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
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

*Integrate user authentication (3). This is essentially user login stuff so that the site's contents that can be displayed, accessed, and/or modified are limited depending on who the user is and the data corresponding to the user. This is useful for this site because it allows for security and management of data between multiple people who would want to use the site. So for this, I would use the passport module within express and use mongoose schemas to help manage users and user data. I had this done in the end so that uses would have their own set of exercises and exercise data that they could view and use. I have never used jQuery before, and I think it ended up pretty well. It worked and all! :D

*Use a CSS framework throughout the site (1). This pretty much involves creating site layouts and interactivity via CSS frameworks. This would make the site more fancy and help to speed development. One example of CSS framework that I could use would be bootstrap, but modified to suit my needs. I used a simple bootstrap template framework that I found off the web. I used a simpler one more for my personal preferance of nice, neat, and tidy layouts and views. I have not done any CSS stuff that requires anything else other than a slapped together .css file or within a small style tag. As a result, what I thought would be the easiest part to do turned out to be the most difficult, as wrangling with all the external stuff and settings and all the like turned out to be quite hard. I also ended up with a bunch of glitches regarding how my documents interacted with the css. I resolved them for the most part, but I sill had one huge bug that I never managed to figure out regarding viewing my journal entries, with how the css is unable to load (404) despite my incorporating the css site wide into the layout.hbs file and it working for all my other routes. However, for the first time using CSS of anything higher than zombie level complexity, I think I did alright.

*Integrate visual effects via CSS 3 transitions or a Javascript library like JQuery (1). As the description would imply, this would involve integrating visual effects (e.g. moving images/text) onto my pages. This would be done to make the page more appealing and possibly adding potential fun interaction with site elements. From looking at CSS 3 and JQuery, in this case I think the best choice for me to use would be CSS 3, as it seems a bit more intuitive. I ended up making the site logo at the top rotate endlessly, had the top banner of the site slowly but continuously change color; blue and grey when the user is logged in, while non-logged in userse see orange and grey. While I never used CSS to do animations, I have some familiarity with animations/visual effects from other stuff like photoshop or java's processing which definately helped me get into the right frame of mind to do this.

*Perform client side form validation using a JavaScript library (2). This involves the input from a form being checked by the web browser before the data is sent to the server. This allows for security and to make sure users enter in the proper data. A possible library that could be used is Parsley (http://parsleyjs.org/). In the end, I had the client-side form validation done on /login, /register, and /exercises; all checking to see if the information entered was entered at all/entered right. I thought that using jquery for this would be quite difficult, but it actually wasn't that bad as the validation worked in quite a logical manner.

*Integrating jsHint into the workflow (1). This would help to root out any mistakes/bugs/errors that may occur over the course of time and as a result help to speed up development. In the end, I ended up implementing a .jshintrc file into my project's root folder so that it would automatically do it's work along with me installing sublimelinter, the SublimeText's package for automatically using jsHint. It helped me with a bunch of colon and curly brace errors (all fixed now), with any remaining errors being just ones caused by library use (reference libraries cause jshint to get uppity, but don't really count).


