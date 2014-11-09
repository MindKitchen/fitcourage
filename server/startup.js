Meteor.startup(function() {
  // Start the clocks!
  Runs.find().forEach(function (run) {
    Meteor.call("startRun", run);
  });

  // Is there a settings.json?
  if (typeof Meteor.settings === "undefined") {
    Meteor.settings = {};
  }

  // Set defaults
  _.defaults(Meteor.settings, {
  });

  // Configure Twitter
  if (Meteor.settings.twitter) {
    ServiceConfiguration.configurations.remove({
      service: "twitter"
    });
    ServiceConfiguration.configurations.insert({
      service: "twitter",
      consumerKey: Meteor.settings.twitter.consumerKey,
      secret: Meteor.settings.twitter.secret
    });
  }
});
