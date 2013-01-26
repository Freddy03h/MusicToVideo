define([
  // Application.
  "app",
  "text!templates/playlist-list.html"
],

function(app, template) {

  return Backbone.Marionette.ItemView.extend({
    tagName: "div",
    id:"playlist-list-item",
    template: template,
    events: {
    },
    initialize: function(){

    }
  });

});
