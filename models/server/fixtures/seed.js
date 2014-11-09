"use strict";

var users = [
  { name: "Runner", email: "author@fitcourage.com", roles: [], password: "runner!" },
  { name: "Admin", email: "admin@fitcourage.com", roles: ["admin"], password: "admin!" }
];

var runs = [
  {
    name: "Up & Runnin' - Week 1",
    time: 0,
    intervals: [
      { type: "single", name: "Warmup Walk", time: 5 * 60 },
      { type: "single", name: "Run", time: 60 },
      { type: "single", name: "Walk", time: 90 },
      { type: "single", name: "Run", time: 60 },
      { type: "single", name: "Walk", time: 90 },
      { type: "single", name: "Run", time: 60 },
      { type: "single", name: "Walk", time: 90 },
      { type: "single", name: "Run", time: 60 },
      { type: "single", name: "Walk", time: 90 },
      { type: "single", name: "Run", time: 60 },
      { type: "single", name: "Walk", time: 90 },
      { type: "single", name: "Run", time: 60 },
      { type: "single", name: "Walk", time: 90 },
      { type: "single", name: "Run", time: 60 },
      { type: "single", name: "Walk", time: 90 },
      { type: "single", name: "Run", time: 60 },
      { type: "single", name: "Walk", time: 90 }
    ]
  },
  {
    name: "Up & Runnin' - Week 2",
    time: 0,
    intervals: [
      { type: "single", name: "Warmup Walk", time: 5 * 60 },
      { type: "single", name: "Run", time: 90 },
      { type: "single", name: "Walk", time: 120 },
      { type: "single", name: "Run", time: 90 },
      { type: "single", name: "Walk", time: 120 },
      { type: "single", name: "Run", time: 90 },
      { type: "single", name: "Walk", time: 120 },
      { type: "single", name: "Run", time: 90 },
      { type: "single", name: "Walk", time: 120 },
      { type: "single", name: "Run", time: 90 },
      { type: "single", name: "Walk", time: 120 },
      { type: "single", name: "Run", time: 90 },
      { type: "single", name: "Walk", time: 120 }
    ]
  },
  {
    name: "Up & Runnin' - Week 3",
    time: 0,
    intervals: [
      { type: "single", name: "Warmup Walk", time: 5 * 60 },
      { type: "single", name: "Run", time: 90 },
      { type: "single", name: "Walk", time: 90 },
      { type: "single", name: "Run", time: 180 },
      { type: "single", name: "Walk", time: 180 },
      { type: "single", name: "Run", time: 90 },
      { type: "single", name: "Walk", time: 90 },
      { type: "single", name: "Run", time: 180 },
      { type: "single", name: "Walk", time: 180 }
    ]
  },
  {
    name: "Up & Runnin' - Week 4",
    time: 0,
    intervals: [
      { type: "single", name: "Warmup Walk", time: 5 * 60 },
      { type: "single", name: "Run", time: 180 },
      { type: "single", name: "Walk", time: 90 },
      { type: "single", name: "Run", time: 5 * 60 },
      { type: "single", name: "Walk", time: 160 },
      { type: "single", name: "Run", time: 180 },
      { type: "single", name: "Walk", time: 90 },
      { type: "single", name: "Run", time: 5 * 90 }
    ]
  }
];

Meteor.startup(function() {
  if (Meteor.users.find().count() === 0) {
    users.forEach(function (user) {
      console.log("Seeding user: ", user);
      var id = Accounts.createUser({
        email: user.email,
        password: user.password,
        profile: { name: user.name }
      });

      if (user.roles.length > 0) {
        Roles.addUsersToRoles(id, user.roles);
      }
    });
  }

  if (Runs.find().count() === 0) {
    runs.forEach(function (run) {
      run.total = run.intervals.reduce(function (previous, current) {
        return previous + current.time;
      }, 0);

      console.log("Seeding run: ", run);
      Runs.insert(run);
    });
  }
});
