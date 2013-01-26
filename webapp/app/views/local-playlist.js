define([
  // Application.
  "app",
  "text!templates/local-playlist.html",
  "models/video-collection",
  "models/playlist-model"
],

function(app, template, VideoCollection, PlaylistModel) {

  return Backbone.Marionette.CompositeView.extend({
    tagName: "div",
    id:"local-playlist",
    template: template,
    events: {
      "submit #list-songs" : "transformToVideo"
    },
    initialize : function(){
      app.someModule.models.playlistTmp = new PlaylistModel({ id: "Local-" + new Date().getTime() });
      app.someModule.models.playlistTmp.videos = new VideoCollection();
    },
    transformToVideo: function(e){
      e.preventDefault();
      var formData = $(e.currentTarget).toObject();

      console.log(formData);

      var defaultData = {
        'channel':'music',
        'filters':'official',
        'sort':'relevance',
        'page':'1',
        'limit':'1'
      };

      var multicall = [];

      _.each(formData.songs, function(songSearchString){
        multicall.push({
          'call': '/videos',
          'args': _.extend({search: songSearchString},defaultData)
        });
      });

      app.someModule.models.playlistTmp.videos.fetch({
        data : JSON.stringify(multicall),
        type: 'POST',
        dataType: 'json',
        success: function(model, response){
          console.log(model);
          app.someModule.models.playLists.add(app.someModule.models.playlistTmp);
          app.someModule.models.playLists.saveLocal();
          Backbone.history.navigate('playlist/local/'+app.someModule.models.playlistTmp.id, true);
        }
      });

    }
  });

});
