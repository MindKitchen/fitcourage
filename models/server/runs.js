/* global runIntervals:true */
"use strict";

Meteor.publish("runs", function () {
  return Runs.find();
});

var runIntervals = {};

Meteor.methods({
  startRun: function (run) {
    runIntervals[run._id] = Meteor.setInterval(function tick () {
      Runs.update(run._id, {
        $inc: { time: 1 }
      });
    }, 1000);

    Runs.update(run._id, {
      $set: { status: "running" }
    });
    console.log("Started clock for ", run.name);
  },
  stopRun: function (run) {
    Meteor.clearInterval(runIntervals[run._id]);
    Runs.update(run._id, {
      $set: { status: "stopped" }
    });

    console.log("Stopped clock for ", run.name);
  },
  toggleRun: function (run) {
    if (runIntervals[run._id]._idleTimeout === -1) {
      Meteor.call("startRun", run);
    } else {
      Meteor.call("stopRun", run);
    }
  },
  resetRun: function (run) {
    Meteor.call("stopRun", run);
    Runs.update(run._id, {
      $set: {
        time: 0,
        status: "stopped"
      }
    });
    Meteor.call("startRun", run);
  }
});
