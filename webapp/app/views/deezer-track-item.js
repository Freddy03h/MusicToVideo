define([
  // Application.
  "app",
  "text!templates/deezer-track-item.html"
],

function(app, template) {

  return Backbone.Marionette.ItemView.extend({
    tagName: "div",
    id:"dz-tr-item",
    template: template,
    events: {
    },
    initialize: function(){

    }
  });

});
