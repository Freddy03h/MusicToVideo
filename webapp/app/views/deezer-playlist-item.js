define([
  // Application.
  "app",
  "text!templates/deezer-playlist-item.html"
],

function(app, template) {

  return Backbone.Marionette.ItemView.extend({
    tagName: "div",
    id:"dz-pl-item",
    template: template,
    events: {
    },
    initialize: function(){

    }
  });

});
