Router.configure({
  layoutTemplate: "layout"
});

Router.route("/", function () {
  GAnalytics.pageview();
  this.render("home");
}, { name: "home" });

Router.route("/login", function () {
  GAnalytics.pageview();
  this.layout("layout-basic");
  this.render("login");
}, { name: "login" });

Router.route("/profile", function () {
  GAnalytics.pageview();
  this.render("user-profile");
}, { name: "user-profile" });

Router.route("/run/:_id", function () {
  GAnalytics.pageview();
  this.render("run");
}, {
  name: "run",
  data: function () { return Runs.findOne(this.params._id); } 
});
