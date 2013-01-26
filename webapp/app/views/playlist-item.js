define([
  // Application.
  "app",
  "text!templates/playlist-video-item.html"
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
