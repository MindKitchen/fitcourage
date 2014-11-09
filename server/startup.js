Meteor.startup(function() {
  Runs.find().forEach(function (run) {
    Meteor.call("startRun", run);
  });
});
