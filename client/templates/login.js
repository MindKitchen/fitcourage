Template.login.events({
  "click .fc-login__sso__provider--twitter": function (e) {
    e.preventDefault();
    Meteor.loginWithTwitter(function (error) {
      if (error) { return; }

      Router.go("home");
    });
  }
});

Template.login.helpers({
});
