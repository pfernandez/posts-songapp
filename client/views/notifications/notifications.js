Template.notifications.helpers({
  notifications: function() {
    return Notifications.find({userId: Meteor.userId(), read: false});
  },
  notificationCount: function(){
      return Notifications.find({userId: Meteor.userId(), read: false}).count();
  }
});

Template.notification.helpers({
  notificationSongPath: function() {
    return Router.routes.songPage.path({_id: this.songId});
  }
})

Template.notification.events({
  'click a': function() {
    Notifications.update(this._id, {$set: {read: true}});
  }
})

/*
Turning a Variable Into a Reactive Function

var _currentLikeCount = 0;
var _currentLikeCountListeners = new Deps.Dependency();
currentLikeCount = function() {
  _currentLikeCountListeners.depend();
  return _currentLikeCount;
}

Using setInterval to call our function every few seconds:

Meteor.setInterval(function() {
  var postId;
  if (Meteor.user() && postId = Session.get('currentPostId')) {
    getFacebookLikeCount(Meteor.user(), Posts.find(postId), 
      function(err, count) {
        if (!err && count !== _currentLikeCount) {
          _currentLikeCount = count;
          _currentLikeCountListeners.changed();
        }
      });
  }
}, 5 * 1000);
*/
