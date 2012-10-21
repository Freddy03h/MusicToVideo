define([
  // Application.
  "app",
  "models/api-sync",
  "models/playlist-model",
  "models/video-collection"
],

function(app, ApiSync, PlaylistModel, VideoCollection) {

  return Backbone.Collection.extend({
	model: PlaylistModel,
	fetchDM: function(success, error){
		var self = this;
		console.log('fetchDM');
		if(app.someModule.user){
			DM.api('/me/playlists', 'get', function(response){
              if (!response || response.error)
              {
                  alert('Error occured');
              }
              else
              {
                  //alert('Liked successfuly');
                  console.log(response.list);
                  self.add(response.list);
                  //return response.list;
                  if(typeof(success) == 'function') success(self);
              }
          });
		}
	}
  });

});
