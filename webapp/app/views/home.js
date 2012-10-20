define([
  // Application.
  "app",
  "text!templates/home.html"
],

function(app, template) {

  return Backbone.Marionette.CompositeView.extend({
    tagName: "div",
    id:"home",
    template: template,
    events: {
    }
  });

});
