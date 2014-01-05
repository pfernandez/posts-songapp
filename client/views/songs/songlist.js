Template.songsList.helpers({
  hasMoreSongs: function(){
    this.songs.rewind();
    return Router.current().limit() == this.songs.fetch().length;
  }
/*
this.posts refers to the current cursor, so this.posts.fetch().length refers to the number of posts that are actually in the cursor.

Note that if we didn't use rewind(), the fetch() would only work a single time, which would be a problem since the helper might be reactively called multiple times when Router.current().limit() changes.
*/
});
