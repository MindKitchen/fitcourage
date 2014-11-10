Template.run.events({
  "click .fc-run__toggle": function (e) {
    e.preventDefault();

    console.log("calling toggleRun");
    Meteor.call("toggleRun", this);
  },
  "click .fc-run__reset": function (e) {
    e.preventDefault();

    Meteor.call("resetRun", this);
  }
});

var formatTime = function (time) {
  var format = [];
  format.push(Math.floor(time / 60));
  format.push(("00" + (time % 60)).slice(-2));
  return format.join(":");
};

Template.run.helpers({
  formattedTime: function () {
    return formatTime(this.time);
  },
  currentInterval: function () {
    if (this.intervals === undefined) { return; }

    var interval = this.intervals[0];
    var t = interval.time;
    var i = 1;

    while (this.time > t && i < this.intervals.length) {
      interval = this.intervals[i];
      t += this.intervals[i++].time;

      if (this.time === t) {
        (new Howl({ urls: [ "/sounds/alert.mp3", "/sounds/alert.ogg" ] })).play();
        navigator.vibrate(1000);
      }
    }

    return interval.name;
  },
  toggleStatus: function () {
    return (this.status === "running") ? "fa-pause" : "fa-play";
  }
});
