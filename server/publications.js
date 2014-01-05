Meteor.publish('songs', function(options) {
  return Songs.find({}, options);
});
/*
A more secure pattern could be passing the individual parameters themselves instead of the whole object, to make sure you stay in control of your data:

Meteor.publish('songs', function(sort, limit) {
  return Songs.find({}, {sort: sort, limit: limit});
});
*/

Meteor.publish('singleSong', function(id) {
  return id && Songs.find(id);
});

Meteor.publish('comments', function(songId) {
  return Comments.find({songId: songId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId});
});

/////////////////////////////////////////////////

Meteor.publish('songsByAuthor', function(){
  return Songs.find({'author':'Tom Coleman'});
});


Meteor.publish('songsHideAuthor', function(){
  return Songs.find({}, {fields: {
    author: false
  }});
});


Meteor.publish('songsByAuthorHideTitle', function(){
  return Songs.find({'author':'Tom Coleman'}, {fields: {
    title: false
  }});
});
