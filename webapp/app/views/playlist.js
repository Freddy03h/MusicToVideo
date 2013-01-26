define([
  // Application.
  "app",
  "text!templates/playlist.html",
  "views/playlist-item"
],

function(app, template, PlaylistItemView) {

  return Backbone.Marionette.CompositeView.extend({
    tagName: "div",
    className:"playlist",
    template: template,
    itemViewContainer: "#video-list",
    itemView: PlaylistItemView,
    events: {
      "click #transform": "transform"
    },
    initialize: function(){
    },
    transform: function(e){
      e.preventDefault();
      var self = this;
      console.log(e);
      console.log(this.collection);
      console.log(app.someModule.user);

      var idS = "";
      var first = true;

      this.collection.each(function(vid){
        if(first){
          first = false;
        }else{
          idS += ',';
        }
        idS += vid.id;
      });

      console.log(idS);


      if(app.someModule.user){
      DM.api('/me/playlists', 'post', {name: self.model.id},function(response){
              if (!response || response.error)
              {
                  alert('Error occured');
              }
              else
              {
                  console.log(response.id);
                  var playlistID = response.id;
                  
                  DM.api('/playlist/'+ playlistID +'/videos', 'post', {ids: idS}, function(response){
                    if (!response || response.error)
                    {
                        alert('Error occured');
                    }
                    else
                    {
                        //alert('Liked successfuly');
                        console.log(response);
                        var col = self.model.collection;
                        col.remove(self.model);
                        col.saveLocal();
                        Backbone.history.navigate('playlist/daily/'+playlistID, true);
                        //self.add(response.list);
                        //return response.list;
                    }
                });


              }
          });
      }

    }
  });

});
