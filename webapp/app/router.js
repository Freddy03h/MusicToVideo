define([
  // Application.
  "app",
  "views/home",

  "views/deezer",
  "views/deezer-playlist",
  "views/local",
  "views/local-playlist",
  "views/songs-list",

  "views/playlist-list",
  "views/playlist",
  "views/playlist-daily",

  "models/playlist-daily-collection",
  "models/video-daily-collection",

  "models/playlist-model"
],

function(app, HomeView, DeezerView, DeezerPlaylistView, LocalView, LocalPlaylistView, SongsListView, PlaylistListView, PlaylistView, PlaylistDailyView, PlaylistDailyCollection, VideoDailyCollection, PlaylistModel) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "deezer/:id": "deezerPlaylist",
      "deezer": "deezer",
      "local/:id": "localPlaylist",
      "local": "local",
      "songs-list": "songsList",
      "playlist": "playlist",
      "playlist/local/:id": "playlistLocal",
      "playlist/daily/:id": "playlistDaily"
    },

    index: function() {
      app.someModule.views.home = (app.someModule.views.home) ? app.someModule.views.home : new HomeView();
      app.mainRegion.show(app.someModule.views.home);
    },

    deezer: function(){
      DZ.api('/user/7220196/playlists', function(response){
        console.log(response.data);
        app.someModule.models.deezerPlaylists = new Backbone.Collection(response.data);
        console.log(app.someModule.models.deezerPlaylists);
        //var data = JSON.stringify(response.tracks.data);
        //document.getElementById('playlistDeezer').innerHTML=data;
        app.someModule.views.deezer = (app.someModule.views.deezer) ? app.someModule.views.deezer : new DeezerView({collection: app.someModule.models.deezerPlaylists});
        app.mainRegion.show(app.someModule.views.deezer);

        window.scrollTo(0, 0);
      });
      
    },

    deezerPlaylist: function(id){
      console.log(id);
      DZ.api('/playlist/'+id, function(response){
        console.log(response.tracks.data);
        app.someModule.models.deezerTracks = new Backbone.Collection(response.tracks.data);

        app.someModule.views['playlistDeezer'+id] = (app.someModule.views['playlistDeezer'+id]) ? app.someModule.views['playlistDeezer'+id] : new DeezerPlaylistView({id:id,collection: app.someModule.models.deezerTracks});
        app.mainRegion.show(app.someModule.views['playlistDeezer'+id]);

        window.scrollTo(0, 0);
      });
      
    },

    local: function(){
      app.someModule.views.local = (app.someModule.views.local) ? app.someModule.views.local : new LocalView();
      app.mainRegion.show(app.someModule.views.local);
    },

    localPlaylist: function(id){
      app.someModule.views.playlistLocal = (app.someModule.views.playlistLocal) ? app.someModule.views.playlistLocal : new LocalPlaylistView();
      app.mainRegion.show(app.someModule.views.playlistLocal);
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
      app.someModule.views['playlistShow'+id] = (app.someModule.views['playlistShow'+id]) ? app.someModule.views['playlistShow'+id] : new PlaylistView({dailymotion: false, id:id, model : app.someModule.models.playLists.get(id), collection: app.someModule.models.playLists.get(id).videos});
      app.mainRegion.show(app.someModule.views['playlistShow'+id]);
    },

    playlistDaily: function(id){
      console.log(id);
      var playList = (app.someModule.models.playListsDaily && app.someModule.models.playListsDaily.get(id)) ? app.someModule.models.playListsDaily.get(id) : new PlaylistModel({id: id});
      console.log(playList);
      playList.videos = new VideoDailyCollection();

      app.someModule.views['playlistDailyShow'+id] = (app.someModule.views['playlistDailyShow'+id]) ? app.someModule.views['playlistDailyShow'+id] : new PlaylistDailyView({dailymotion: true,id:id, model : playList, collection: playList.videos});
      app.mainRegion.show(app.someModule.views['playlistDailyShow'+id]);

      playList.videos.fetchDM( id, function(model){
        console.log(model);
        app.someModule.views['playlistDailyShow'+id].render();
      });
    }
  });

  return Router;

});
