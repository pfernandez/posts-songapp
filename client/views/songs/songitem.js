Template.songItem.helpers({
  ownSong: function() {
    return this.userId == Meteor.userId();
  },
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }
});


/*

Posts.find().observe({
  added: function(post) {
    // when 'added' callback fires, add HTML element
    $('ul').append('<li id="' + post._id + '">' + post.title + '</li>');
  },
  changed: function(post) {
    // when 'changed' callback fires, modify HTML element's text
    $('ul li#' + post._id).text(post.title);
  },
  removed: function(post) {
    // when 'removed' callback fires, remove HTML element
    $('ul li#' + post._id).detach();
  }
});

When Should We Use observe()?

Using the above pattern is sometimes necessary, especially when dealing with third-party widgets. For example, let's imagine we want to add or remove pins on a map in real time based on Collection data (say, to show the locations of currently logged in users).

Instead of the above, Meteor lets us write

<template name="postsList">
  <ul>
    {{#each posts}}
      <li>{{title}}</li>
    {{/each}}
  </ul>
</template>

And then get our list of posts with:

Template.postsList.helpers({
  posts: function() {
    return Posts.find();
  }
});
*/
