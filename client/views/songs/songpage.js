Template.songPage.helpers({
  comments: function() {
    return Comments.find({songId: this._id});
  }
});
