define([
  // Application.
  "models/api-sync",
  "models/playlist-model",
  "models/video-collection"
],

function(ApiSync, PlaylistModel, VideoCollection) {

  return Backbone.Collection.extend({
	model: PlaylistModel,
	initialize: function(){
		var self = this;
		var local = localStorage.getItem('local-playlist');
		if(local){
			var json = JSON.parse(localStorage.getItem('local-playlist'));
			_.each(json, function(jso){
				var videoJson = jso.videos;
				delete jso['videos'];
				self.add(jso);
				var playlistModel = self.last();
				playlistModel.videos = new VideoCollection(videoJson);
			});
		}
	},
	saveLocal: function(){
		var json = _.map(this.models, function(playlist){
			console.log(playlist);
			var jsonPl = playlist.toJSON();
			jsonPl.videos = playlist.videos.toJSON();
			return jsonPl;
		});
		localStorage.setItem('local-playlist',JSON.stringify(json));
	}
  });

});
