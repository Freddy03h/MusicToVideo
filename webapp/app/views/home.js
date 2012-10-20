define([
  // Application.
  "app",
  "text!templates/home.html"
],

function(app, template) {

  return Backbone.Marionette.CompositeView.extend({
    tagName: "div",
    id:"home",
    template: template,
    events: {
      "click #connect": 'connect'
    },
    connect : function(e){
      e.preventDefault();
      console.log(e);

      DM.login(function(response)
      {
          if (response.session)
          {
              // user successfully logged in
              console.log(response.session);

              DM.api('/me/playlists', 'get', function(response)
              {
                  if (!response || response.error)
                  {
                      alert('Error occured');
                  }
                  else
                  {
                      alert('Liked successfuly');
                      console.log(response);
                  }
              });

          }
          else
          {
              console.log('et non');
              // user cancelled login
          }
      });
    }
  });

});
