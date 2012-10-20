define([
  // Application.
  "app",
  "text!templates/playlist.html"
],

function(app, template) {

  return Backbone.Marionette.ItemView.extend({
    tagName: "div",
    id:"playlist-item",
    template: template,
    events: {
    },
    initialize: function(){

    }
  });

});
