Template.nav.events({
  "click .fc-nav__logout": function (e) {
    e.preventDefault();
    Meteor.logout();
  }
});

Template.nav.helpers({
  name: function () {
    var user = Meteor.user();
    return user.profile.name || user.twitter.screenname;
  }
});
