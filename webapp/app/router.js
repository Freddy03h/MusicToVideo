define([
  // Application.
  "app",
  "views/home",
  "views/songs-list",
  "views/playlist-list",
  "views/playlist",
  "views/playlist-daily",

  "models/playlist-daily-collection",
  "models/video-daily-collection",

  "models/playlist-model"
],

function(app, HomeView, SongsListView, PlaylistListView, PlaylistView, PlaylistDailyView, PlaylistDailyCollection, VideoDailyCollection, PlaylistModel) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "songs-list": "songsList",
      "playlist": "playlist",
      "playlist/local/:id": "playlistLocal",
      "playlist/daily/:id": "playlistDaily"
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
      console.log(app.someModule.models.playLists);
      app.someModule.models.playListsDaily = (app.someModule.models.playListsDaily) ? app.someModule.models.playListsDaily : new PlaylistDailyCollection();
      
      app.someModule.views.playlist = (app.someModule.views.playlist) ? app.someModule.views.playlist : new PlaylistListView({playlistLocal: app.someModule.models.playLists, playlistDaily: app.someModule.models.playListsDaily});
      app.mainRegion.show(app.someModule.views.playlist);

      app.someModule.models.playListsDaily.fetchDM(function(model){
        console.log(model);
        app.someModule.views.playlist.render();
      });
    },

    playlistLocal: function(id){
      console.log(id);
      console.log(app.someModule.models.playLists.get(id));
      app.someModule.views.playlistShow = new PlaylistView({dailymotion: false, model : app.someModule.models.playLists.get(id), collection: app.someModule.models.playLists.get(id).videos});
      app.mainRegion.show(app.someModule.views.playlistShow);
    },

    playlistDaily: function(id){
      console.log(id);
      var playList = (app.someModule.models.playListsDaily && app.someModule.models.playListsDaily.get(id)) ? app.someModule.models.playListsDaily.get(id) : new PlaylistModel({id: id});
      console.log(playList);
      playList.videos = new VideoDailyCollection();

      app.someModule.views.playlistDailyShow = new PlaylistDailyView({dailymotion: true, model : playList, collection: playList.videos});
      app.mainRegion.show(app.someModule.views.playlistDailyShow);

      playList.videos.fetchDM( id, function(model){
        console.log(model);
        app.someModule.views.playlistDailyShow.render();
      });
    }
  });

  return Router;

});
