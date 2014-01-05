Songs = new Meteor.Collection('songs');

/*
Client side
*/

Songs.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Songs.deny({
  update: function(userId, song, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

/*
Directly manipulating the database from the client creates the perception of immediacy, and can make for a better user experience as long as you remember to handle failure cases gracefully (i.e. when the server comes back saying the change didn't succeed after all).

However, as soon as you start needing to do things that should be outside the user's control (such as timestamping a new post or assigning it to the correct user), it's probably better to use a Method.

Method calls are also more appropriate in a few other scenarios:

When you need to know or return values via callback rather than waiting for the reactivity and synchronization to propagate.
For heavy database functions that would be too expensive to ship a large collection over.
To summarize or aggregate data (e.g. count, average, sum).


Server side Methods (callable from the client).
*/

Meteor.methods({
  song: function(songAttributes) {
    var user = Meteor.user(),
      songWithSameLink = Songs.findOne({url: songAttributes.url});

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to create a new song.");

    // ensure the song has a title
    if (!songAttributes.title)
      throw new Meteor.Error(422, 'Please fill in a title');

    // check that there are no previous songs with the same link
    if (songAttributes.url && songWithSameLink) {
      throw new Meteor.Error(302, 
        'This link has already been used', 
        songWithSameLink._id);
    }

    // pick out the whitelisted keys
    var song = _.extend(_.pick(songAttributes, 'url', 'title', 'message'), {
      userId: user._id, 
      author: user.username, 
      submitted: new Date().getTime(),
      commentsCount: 0
    });

    var songId = Songs.insert(song);

    return songId;
  }
});
