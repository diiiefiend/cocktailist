window.Cocktailist = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Cocktailist.Routers.Router({$el: $("#js-main")});
    Backbone.history.start();
  }
};
