require([
  // Application.
  "app",

  // Main Router.
  "router",

  "views/header",

  "models/playlist-collection"
],

function(app, Router, HeaderView, PlaylistCollection) {

  if(typeof DM != 'undefined'){
    DM.getLoginStatus(function(response)
    {
        if (response.session)
        {
          console.log(response.session);
          app.someModule.user = response.session;
          // logged in and connected user, someone you know
        }
        else
        {
            console.log('not getLoginStatus');
            // no user session available, someone you dont know
        }
    });
  }

  app.someModule.models.playLists = new PlaylistCollection();

  app.someModule.views.header = new HeaderView();
  app.headerRegion.show(app.someModule.views.header);

  // Define your master router on the application namespace and trigger all
  // navigation from this instance.
  app.router = new Router();

  // Trigger the initial route and enable HTML5 History API support, set the
  // root folder to '/' by default.  Change in app.js.
  Backbone.history.start({/* pushState: true,*/ root: app.root });

  /*if(typeof MediaDB == 'undefined')
    alert('Pas de MediaDB');
  else
    alert('MediaDB présent !');*/

  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router. If the link has a `data-bypass`
  // attribute, bypass the delegation completely.
  $(document).on("click", "a[href]:not([data-bypass])", function(evt) {
    // Get the absolute anchor href.
    var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
    // Get the absolute root.
    var root = location.protocol + "//" + location.host + app.root;

    app.mainRegion.animation = evt.currentTarget.getAttribute('data-animation') || 'dissolve';

    // Ensure the root is part of the anchor href, meaning it's relative.
    if (href.prop.slice(0, root.length) === root) {
      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();

      // `Backbone.history.navigate` is sufficient for all Routers and will
      // trigger the correct events. The Router's internal `navigate` method
      // calls this anyways.  The fragment is sliced from the root.
      Backbone.history.navigate(href.attr, true);
    }
  });

});
