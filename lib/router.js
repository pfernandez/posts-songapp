Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [Meteor.subscribe('notifications')]
  }
});

SongsListController = RouteController.extend({
  template: 'songsList',
  increment: 5, 
  limit: function() { 
    return parseInt(this.params.songsLimit) || this.increment; 
  },
  findOptions: function() {
    return {sort: {submitted: -1}, limit: this.limit()};
  },
  waitOn: function() {
    return Meteor.subscribe('songs', this.findOptions());
  },
  data: function() {
    return {
        songs: Songs.find({}, this.findOptions()),
        nextPath: this.route.path({songsLimit: this.limit() + this.increment})
    };
  }
});

Router.map(function() {
/*
By default, Iron Router will look for a template with the same name as the route. In fact, it will even look for a path based on the route name, meaning that if we hadn't defined a custom path (which we did by providing a path option in our route definition), our template would've been accessible at URL /songsList by default.

You may be wondering why we even need to name our routes in the first place. Naming routes lets us use a few Iron Router features that make it easier to build links inside our app. The most useful one is the {{pathFor}} Handlebars helper, which returns the URL path component of any route.
*/
  
  
/*
The special :_id syntax tells the router two things: first, to match any route of the form /songs/xyz/, where “xyz” can be anything at all. Second, to put whatever it finds in this “xyz” spot inside an _id property in the router's params array.

Note that we're only using _id for convenience's sake here. The router has no way of knowing if you're passing it an actual _id, or just some random string of characters.
*/
  this.route('songPage', {
    path: '/songs/:_id',
    waitOn: function() {
      return [
        Meteor.subscribe('singleSong', this.params._id),
        Meteor.subscribe('comments', this.params._id)
      ];
    },
    data: function() { return Songs.findOne(this.params._id); }
/*
Every time a user accesses this route, we'll find the appropriate song and pass it to the template. Remember that findOne returns a single song that matches a query, and that providing just an id as an argument is a shorthand for {_id: id}.

Within the data function for a route, `this` corresponds to the currently matched route, and we can use this.params to access the named parts of the route (which we indicated by prefixing them with : inside our path).
*//*
 ...the router will look for this _id in the most logical place available: the data context of the {{pathFor 'songPage'}} helper, in other words `this`.
 */
  });
  this.route('songEdit', {
    path: '/songs/:_id/edit',
    waitOn: function() { 
      return Meteor.subscribe('singleSong', this.params._id);
    },
    data: function() { return Songs.findOne(this.params._id); }
  });
  this.route('songSubmit', {
    path: '/submit',
    disableProgress: true // don't need the progress bar for this empty form
  });
  
  this.route('songsList', {
    path: '/:songsLimit?',
    controller: SongsListController
  });
});

/*

More About Data Contexts

By setting a template's data context, you can control the value of `this` inside template helpers.

This is usually done implicitly with the {{#each}} iterator, which automatically sets the data context of each iteration to the item currently being iterated on:

{{#each widgets}}
  {{> widgetItem}}
{{/each}}

But we can also do it explicitly using {{#with}}, which simply says "take this object, and apply the following template to it". For example, we can write:

{{#with myWidget}}
  {{> widgetPage}}
{{/with}}

It turns out you can achieve the same result by passing the context as an argument to the template call. So the previous block of code can be rewritten as:

{{> widgetPage myWidget}}

*/

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');
    this.stop();
  }
}
Router.before(requireLogin, {only: 'songSubmit'});
Router.before(function() { clearErrors() });
