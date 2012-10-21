define([
  // Application.
  "app",
  "text!templates/local.html"
],

function(app, template) {

  return Backbone.Marionette.CompositeView.extend({
    tagName: "div",
    id:"local",
    template: template,
    events: {
    },
    initialize : function(e){
    }
  });

});
