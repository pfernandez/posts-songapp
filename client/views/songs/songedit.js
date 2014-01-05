Template.songEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentSongId = this._id;

    var songProperties = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    }

    Songs.update(currentSongId, {$set: songProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('songPage', {_id: currentSongId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this song?")) {
      var currentSongId = this._id;
      Songs.remove(currentSongId);
      Router.go('songsList');
    }
  }
});
