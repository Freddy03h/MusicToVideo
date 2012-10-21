define([
  // Application.
  "models/api-sync",
  "models/video-model"
],

function(ApiSync, VideoModel) {

  return Backbone.Collection.extend({
	model: VideoModel,
	url: 'https://api.dailymotion.com/',
	parse: function(response){
		console.log(response);
		return _.map(response, function(obj){
			return obj.result.list[0];
		});
	}
    //url: '/videos.json'
    //sync: ApiSync,
  });

});
