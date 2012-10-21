define([
  // Application.
  "app",
  "models/api-sync",
  "models/video-model"
],

function(app, ApiSync, VideoModel) {

  return Backbone.Collection.extend({
	model: VideoModel,

	fetchDM: function(id, success, error){
		var self = this;
		console.log('fetchDM');
		if(app.someModule.user){
			DM.api('/playlist/' + id + '/videos', 'get', function(response){
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

    //url: '/videos.json'
    //sync: ApiSync,
  });

});
