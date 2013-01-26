define([
  // Application.
  "app",
  "text!templates/header.html"
],

function(app, template) {
  return Backbone.Marionette.CompositeView.extend({
    tagName: "div",
    id:"head",
    template: template,
    events: {
      "click #btn-back": "goBack"
    },
    goBack: function(e){
      e.preventDefault();
      window.history.back();
    }
  });

});
