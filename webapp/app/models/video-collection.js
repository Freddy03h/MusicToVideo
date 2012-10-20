define([
  // Application.
  "models/api-sync",
  "models/video-model"
],

function(ApiSync, VideoModel) {

  return Backbone.Collection.extend({
	model: VideoModel
    //url: '/videos.json'
    //sync: ApiSync,
  });

});
