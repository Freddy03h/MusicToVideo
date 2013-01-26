define([
  // Application.
  "app",
  "text!templates/playlist-list.html",
  "views/playlist-list-item"
],

function(app, template, PlaylistListItemView) {

  return Backbone.View.extend({
    tagName: "div",
    id:"playlist-list",
    //itemView: PlaylistListItemView,
    template: template,
    events: {
    },
    initialize: function(option){
      this.template = _.template(template);
      this.playlistLocal = option.playlistLocal;
      this.playlistDaily = option.playlistDaily;
    },
    render : function()
    {
      var renderedContent = this.template({
          playlistLocal: (this.playlistLocal) ? this.playlistLocal.toJSON() : undefined,
          playlistDaily: (this.playlistDaily) ? this.playlistDaily.toJSON() : undefined
      });
      this.$el.html(renderedContent);
      return this;
    }
  });

});
