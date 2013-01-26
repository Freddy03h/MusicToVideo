define([
  // Application.
  "app",
  "text!templates/deezer.html",
  "views/deezer-playlist-item"
],

function(app, template, DzPlItemView) {

  return Backbone.Marionette.CompositeView.extend({
    tagName: "div",
    id:"deezer",
    template: template,
    itemViewContainer: "#list-playlists",
    itemView: DzPlItemView,
    events: {
    },
    initialize : function(){
      /*var self = this;
       DZ.api('/user/7220196/playlists', function(response){
          console.log(response.data);
          self.collection = new Backbone.Collection(response.data);
          console.log(self.collection);
          //var data = JSON.stringify(response.tracks.data);
          //document.getElementById('playlistDeezer').innerHTML=data;
        });*/
    }
  });

});
