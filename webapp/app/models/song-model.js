define([
  // Application.
  "models/api-sync"
],

function(ApiSync) {

  return Backbone.Model.extend({
    url: 'https://api.dailymotion.com/videos',
    //sync: ApiSync,
    //idAttribute: 'numSerie',
    parse: function(response){
      return response.list[0];
    }
  });

});
