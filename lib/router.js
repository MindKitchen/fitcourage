Router.configure({
  layoutTemplate: "layout",
  loadingTemplate: "loading"
});

Router.route("/", function () {
  GAnalytics.pageview();
  this.wait(Meteor.subscribe("runs", this.params._id));

  if (this.ready()) {
    this.render("home");
  } else {
    this.render("loading");
  }
}, { name: "home" });

Router.route("/login", function () {
  GAnalytics.pageview();
  this.layout("layout-basic");
  this.render("login");
}, { name: "login" });

Router.route("/profile", function () {
  GAnalytics.pageview();

  if (this.ready()) {
    this.render("user-profile");
  } else {
    this.render("loading");
  }
}, { name: "user-profile" });

Router.route("/run/:_id", function () {
  GAnalytics.pageview();
  this.wait(Meteor.subscribe("runs", this.params._id));

  if (this.ready()) {
    this.render("run");
  } else {
    this.render("loading");
  }
}, {
  name: "run",
  data: function () { return Runs.findOne(this.params._id); } 
});
