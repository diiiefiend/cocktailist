window.Cocktailist = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function() {
    this.currentUser = new Cocktailist.Models.CurrentUser();
    this.currentUser.fetch();
    
    new Cocktailist.Routers.Router({$el: $("#js-main")});
    Backbone.history.start();
  }

};
