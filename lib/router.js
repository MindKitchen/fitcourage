Router.configure({
  layoutTemplate: "layout"
});

Router.route("/", function () {
  GAnalytics.pageview();
  this.render("home");
}, { name: "home" });
Router.route("/run/:_id", function () {
  GAnalytics.pageview();
  this.render("run");
}, {
  name: "run",
  data: function () { return Runs.findOne(this.params._id); } 
});
