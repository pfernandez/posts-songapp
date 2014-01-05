Template.content.songLyrics = function() {
  return 'Type some lyrics..';
};

Template.songSubmit.events({
  'keyup article' : function (e) {

    var song = {
      lyrics: e.target.innerHTML
    };
    
    Meteor.call('song', song, function(error, id) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
        if (error.error === 302)
          Router.go('songPage', {_id: error.details})
      } else {
        Router.go('songPage', {_id: id});
      }
    });
  }
});

function song(songAttributes) {
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
