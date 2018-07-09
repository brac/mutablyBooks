# Mutably Exercise

*Notes:*
How do I list all the objects in a local mongo db?
```bash
mongo
show dbs
use <db>
show collections
db.collection.find()
```

How do I reset / seed the database?
`POST` to `/reset` or navigate to `/reset` for a button

What is my heroku URL?
`heroku info -s | grep web_url | cut -d= -f2`

How do I set the buildpacks?
`heroku buildpacks:set heroku/nodejs`

mLab API Key?
`b8Qg7cPxiQbesY9DD6XE-LlCUzHpC2N5`

What did you do to get this deployed to Heroku?
  [Soruce](https://devcenter.heroku.com/articles/troubleshooting-node-deploys)
  Set the build packs
  Set the versions for Node and npm in `package.json`
  Uninstalled `node-inspector` b/c I think it was using an old version of `v8-debug` which was preventing the build.

How do I trigger a form to reset to it's defualt value.
  This is two parts. First you want to get at the document elements `.reset()` method, which will reset the form back to it's starting state. However in this project we are using jquery and as such we will be selecting the element as a jq object. So the methods are different, to fire that `.reset()` method we can `.trigger()` it with jquery like so: `$(.my-form).trigger('reset)`

How do I add a license to my project?
  This is eaisly done with GitHub. Create a new file in your root directory, name it LICENSE and click the new button 'License Templates'. Choose the one you want and bam.

How do I start a new Heroku deployment?
```bash
heroku create
git remote -v #for confirmation
git push heroku master
```

### Plan:
  * Get the app running locally
  * Deploy the app to Heroku
  * Fork scaffolding
  * Plan App


### Planning the App
* Look up
  * jQ AJAX Function
  * Bootstrap
  * .seralize()
    * Used for pulling data from forms and creating a text string in URL-encoded notation
  * .trigger()
    * Fire an event handeler
  * Treehouse AJAX project files

- Plan
  * Visualize
  * UI Library framework
  * Get Books Button
  * Books Display Page
  * Book item
    * Edit
    * Delete
  * Express
  * body-parser
  * bootstrap, do I need this?
  * ejs
  * Build HTML `<li>`s
  * append to ul
  * Each book is a card
  * Include ID in buttons
  * Edit Item talking
  * Delete Item talking
  * Save Button swap
  * Edit Item functionality
  * Delete Item functionality
  * Create Form
  * Create Item

  * Use MIT Lisense
  * Deploy to Heroku
  * Save bug
  - README.md

  - React

- Specs
  - README.md
  * Single Page, everything on /
  * Use jQ AJAX function
  * No data via forms
  * use `event.preventDefault()`
  - CRUD
    * R: User can read and display all data for a resource
    * C: User can create a new item via a create form
      * New item should either be appended to the page or all items re-retrieved. No page refresh
    * U: User can update an existing item.
      * Inline updating: Edit button next to each item. When clicked text is replcaed with pre-populated editable input field. Edit button becomes a save button. On save click and succes message from server input gets replaced with updated text, no page refresh
      example this:
      ```html
      <br>
        <img width="229" alt="screen shot 2017-05-11 at 3 26 09 pm" src="https://cloud.githubusercontent.com/assets/3010270/25974508/4ac57980-365e-11e7-8b1f-6cf9eefaac22.png">
        <br>
      ```
        becomes:
      ```html
        <br>
        <img width="253" alt="screen shot 2017-05-11 at 3 26 18 pm" src="https://cloud.githubusercontent.com/assets/3010270/25974512/5024433e-365e-11e7-802f-c60afacddecd.png">
        <br>
      ```
      On edit click
    * D: User can delete item via delet button next to each. No page refresh
    * Use UI Library
    - Use MIT Lisense
    - Deploy to Heroku

## Original Specs
### Description

[Mutably](http://mutably.herokuapp.com/) is a mutable, RESTful, CRUD API. This means that it has endpoints that you can interact with RESTfully via a front-end.

Visit the repo page for information about the resources available and how to interact with them: [https://github.com/GuildCrafts/mutably](https://github.com/GuildCrafts/mutably)

Your goal is to build a front-end that consumes the Mutably API. You can choose any one of the 3 resources. You front-end needs to complete all of the CRUD (Create, Read, Update, Delete) functions.

For the goal, you will start with [this scaffolded template](https://github.com/GuildCrafts/mutably-starter). Fork to get started.
You will use jQuery to complete this goal.


### Context

Interacting with a third-party API is a key skill for any developer. Most APIs have extensive documentation and require a fair amount of "overhead" just to get started working with them.

Not Mutably. This API is _way_ simpler, with just a few _endpoints_ handling a few different _resources_.

This goal is designed as an introduction to working with third-party APIs so that you can familiarize yourself with the core ideas before moving on to work with bigger, more complex APIs (like GitHub or Twitter).

### Specifications

- [X] __5:__ Your repo is a fork of [mutably-starter](https://github.com/GuildCrafts/mutably-starter).
- [ ] __5:__ Your repo has a README with instructions for how to run your project.
- [X] __15:__ Your app is SPA (single page app). All CRUD actions take place on the same page, preferably the root (`/`) route.
- [X] __10:__ All interaction with the API happens with jQuery's AJAX function -- don't submit data via forms. You can use `form` html tags, but do all your form submission in your `js`. Make use of jQuery's `event.preventDefault()`.
- [X] __15:__ A user can read and display all the data for a resource.
- [X] __10:__ A user can create a new item via a create form. When the user creates a new item, that item should either get appended to the page or all the items should get re-retrieved in the `js`. No full page refresh.
- [X] __10:__ A user can update an existing item. Updating happens inline. This means that there is an edit button next to each item that, when clicked, the item text gets replaced with an pre-populated editable, input field. And the edit button becomes a save button. Once the save button is clicked and success message comes back from the server, then then input gets replaced with the updated text. No page refresh.
  For example, this: <br>
  <img width="229" alt="screen shot 2017-05-11 at 3 26 09 pm" src="https://cloud.githubusercontent.com/assets/3010270/25974508/4ac57980-365e-11e7-8b1f-6cf9eefaac22.png">
  <br>
  becomes:
  <br>
  <img width="253" alt="screen shot 2017-05-11 at 3 26 18 pm" src="https://cloud.githubusercontent.com/assets/3010270/25974512/5024433e-365e-11e7-802f-c60afacddecd.png">
  <br>
  When the user clickes the edit button.
- [X] __10:__ A user can delete an existing item via a delete button next to each item. No page refresh.
- [X] __10:__ Use a UI library to make your site look nice.
- [ ] __5:__ The artifact produced is properly licensed, preferably with the MIT license.
- [ ] __5:__ App is deployed on Heroku.

#### Stretch

- [ ] Create another version of your front-end using a front-end framework such as React or Angular.

---

***If the mutably data gets too crazy from people adding / deleting things, you can reset the data to the seed data [here](http://mutably.herokuapp.com/).***

***Insider tip: there is an example "solution" (remember, there are MANY ways to hack it!) in the [solution branch](https://github.com/GuildCrafts/mutably-starter/tree/solution) of the starter template.***
