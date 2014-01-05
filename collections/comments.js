Comments = new Meteor.Collection('comments');
Meteor.methods({
  comment: function(commentAttributes) {
    var user = Meteor.user();
    var song = Songs.findOne(commentAttributes.songId);
    
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to make comments");
    if (!commentAttributes.body)
      throw new Meteor.Error(422, 'Please write some content');
    if (!song)
      throw new Meteor.Error(422, 'You must comment on a song');
    comment = _.extend(_.pick(commentAttributes, 'songId', 'body'), {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });
    
    // update the post with the number of comments
    Songs.update(comment.songId, {$inc: {commentsCount: 1}});
    
    // create the comment, save the id
    comment._id = Comments.insert(comment);
    // now create a notification, informing the user that there's been a comment
    createCommentNotification(comment);
    return comment._id;
  }
});
