define([
  // Application.
  "app",
  "text!templates/songs-list.html",
  "models/song-model",
  "models/video-collection",
  "models/playlist-model"
],

function(app, template, SongModel, VideoCollection, PlaylistModel) {

  return Backbone.Marionette.CompositeView.extend({
    tagName: "div",
    id:"songs",
    template: template,
    events: {
      "submit #list-songs" : "transformToVideo"
    },
    initialize: function(){
      app.someModule.models.playlistTmp = new PlaylistModel({ id: "Local-" + app.someModule.models.playLists.length });
      app.someModule.models.playlistTmp.videos = new VideoCollection();
    },
    transformToVideo: function(e){
      e.preventDefault();
      var formData = $(e.currentTarget).toObject();

      /*
      [
        {
          "call": "/auth"
        },
        {
          "call": "/video/x1k2",
          "args":
          {
            "fields": ["title", "thumbnail_url", "owner.screenname"],
          },
          "id": "an opaque id"
        },
        {
          "call": "/invalid/ressource",
        }
      ]
      */

      var defaultData = {
        'channel':'music',
        'filters':'official',
        'sort':'relevance',
        'page':'1',
        'limit':'1'
      };

      var multicall = [];

      _.each(formData.songs, function(songSearchString){
        /*var song = new SongModel();
        song.fetch({
          data:{
            'channel':'music',
            'filters':'official',
            'sort':'relevance',
            'page':'1',
            'limit':'1',
            'search':songSearchString
          },
          success: function(model, response){
            app.someModule.models.playlistTmp.videos.add(model.toJSON());
          }
        });*/
        multicall.push({
          'call': '/videos',
          'args': _.extend({search: songSearchString},defaultData)
        });
      });
      //console.log(JSON.stringify(multicall));

      app.someModule.models.playlistTmp.videos.fetch({
        data : JSON.stringify(multicall),
        type: 'POST',
        dataType: 'json',
        success: function(model, response){
          console.log(model);
          app.someModule.models.playLists.add(app.someModule.models.playlistTmp);
          app.someModule.models.playLists.saveLocal();
        }
      });

      //app.someModule.models.playLists.add(app.someModule.models.playlistTmp);

      //app.someModule.models.playLists.saveLocal();

      Backbone.history.navigate('playlist/local/'+app.someModule.models.playlistTmp.id, true);

      //this.playlistToSearch.fetch({data: formData});
    }
  });

});
