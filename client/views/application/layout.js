
Session.set('someValue', 'A brand new value'); // (in the console)

Template.layout.helpers({
  someValue: function() { return Session.get('someValue'); }
});

/*
Behind the scenes, autorun creates a "computation", and wires it up to re-evaluate whenever the data sources it depends on change.
*/
Deps.autorun(function() {
  console.log('Value is: ' + Session.get('someValue'));
});

/*
Now, let's try changing the title in the console:

❯ Session.set('someValue', 'Yet another value');

Magic! As the session value changed, the autorun knew it had to run its contents all over again, re-outputting the new value to the console.
*/

/*
If we were to reload our browser window manually, our Session variables would naturally be lost (since this would create a new session). On the other hand, if we trigger a hot code reload (for example, by saving one of our source files) the page will reload, but the session variable will still be set.

Always store user state in the Session or the URL so that users are minimally disrupted when a hot code reload happens.

Store any state that you want to be shareable between users within the URL itself.
*/
/*
Deps.autorun(function() {
  console.log('There are ' + Songs.find().count() + ' posts');
});


Since Posts.find() and Session.get() are reactive data sources, they will take care of telling the computation to re-evaluate every time the number of posts changes.

For a comlete list of reactive data sources, see http://docs.meteor.com/#reactivity.
*/
