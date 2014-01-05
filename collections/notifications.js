Notifications = new Meteor.Collection('notifications');

Notifications.allow({
  update: ownsDocument
});

createCommentNotification = function(comment) {
  var song = Songs.findOne(comment.songId);
  if (comment.userId !== song.userId) {
    Notifications.insert({
      userId: song.userId,
      songId: song._id,
      commentId: comment._id,
      commenterName: comment.author,
      read: false
    });
  }
};
