define([
  // Application.
  "app",
  "text!templates/deezer.html"
],

function(app, template) {

  return Backbone.Marionette.CompositeView.extend({
    tagName: "div",
    id:"deezer",
    template: template,
    events: {
    },
    initialize : function(e){
    }
  });

});
