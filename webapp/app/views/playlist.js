define([
  // Application.
  "app",
  "views/playlist-item"
],

function(app, PlaylistItemView) {

  return Backbone.Marionette.CollectionView.extend({
    tagName: "div",
    id:"playlist",
    itemView: PlaylistItemView,
    events: {
    },
    initialize: function(){

    }
  });

});
