window.Cocktailist = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function() {
    this.currentUser = new Cocktailist.Models.CurrentUser();
    this.currentUser.fetch();
    this.siteNav = new Cocktailist.Views.Nav({el: "#nav"});
    this.userMenu = new Cocktailist.Views.UserMenu({el: "#user-menu ul"});

    new Cocktailist.Routers.Router({$el: $("#js-main")});
    Backbone.history.start();
  }

};
