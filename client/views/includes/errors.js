Template.errors.helpers({
  errors: function() {
    return Errors.find();
  }
});
Template.error.rendered = function() {
  var error = this.data;
  Meteor.defer(function() {
    Errors.update(error._id, {$set: {seen: true}});
  });
};

/*
Meteor.defer(). This function tells Meteor to execute its callback "just after" whatever's going on now. 

The rendered callback triggers once our template has been rendered in the browser. Inside the callback, `this` refers to the current template instance, and this.data lets us access the data of the object that is currently being rendered (in our case, an error).
*/
