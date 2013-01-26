define([
  // Application.
  "app",
  "text!templates/playlist-daily.html",
  "views/playlist-item"
],

function(app, template, PlaylistItemView) {

  return Backbone.Marionette.CompositeView.extend({
    tagName: "div",
    className:"playlist-daily",
    template: template,
    itemViewContainer: "#video-list-daily",
    itemView: PlaylistItemView,
    events: {
    },
    initialize: function(){
    }
  });

});
