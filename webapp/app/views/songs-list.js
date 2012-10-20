define([
  // Application.
  "app",
  "text!templates/songs-list.html",
  "models/song-model",
  "models/video-collection"
],

function(app, template, SongModel, VideoCollection) {

  return Backbone.Marionette.CompositeView.extend({
    tagName: "div",
    id:"songs",
    template: template,
    events: {
      "submit #list-songs" : "transformToVideo"
    },
    initialize: function(){
      app.someModule.models.playlistTmp = new VideoCollection();
      console.log(app.someModule.models.playlistTmp);
    },
    transformToVideo: function(e){
      e.preventDefault();
      var self = this;
      console.log(e);
      var formData = $(e.currentTarget).toObject();
      console.log(formData);

      _.each(formData.songs, function(songSearchString){
        console.log(songSearchString);
        var song = new SongModel();
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
            console.log(model.toJSON());
            app.someModule.models.playlistTmp.add(model.toJSON());
            console.log(app.someModule.models.playlistTmp);
          }
        });
      });

      Backbone.history.navigate('playlist', true);

      //this.playlistToSearch.fetch({data: formData});
    }
  });

});
