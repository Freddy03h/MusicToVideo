define([
  // Application.
  "app",
  "views/home",
  "views/songs-list",
  "views/playlist"
],

function(app, HomeView, SongsListView, PlaylistView) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "songs-list": "songsList",
      "playlist": "playlist"
    },

    index: function() {
      app.someModule.views.home = (app.someModule.views.home) ? app.someModule.views.home : new HomeView();
      app.mainRegion.show(app.someModule.views.home);
    },

    songsList: function() {
      app.someModule.views.songs = (app.someModule.views.songs) ? app.someModule.views.songs : new SongsListView();
      app.mainRegion.show(app.someModule.views.songs);
    },

    playlist: function(){
      app.someModule.views.playlist = (app.someModule.views.playlist) ? app.someModule.views.playlist : new PlaylistView({collection: app.someModule.models.playlistTmp});
      app.mainRegion.show(app.someModule.views.playlist);
    }
  });

  return Router;

});
