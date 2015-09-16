Cocktailist.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "feed",
    "browse" : "browse"
  },

  initialize: function (options){
    this.$el = options.$el;
    this._cocktails = new Cocktailist.Collections.Cocktails();
    this._feedItems = new Cocktailist.Collections.FeedItems();
  },

  feed: function (){
    this._feedItems.fetch();
    var view = new Cocktailist.Views.CocktailsFeed({collection: this._feedItems});
    this._swapView(view);
  },

  browse: function (){
    this._cocktails.fetch();
    var view = new Cocktailist.Views.CocktailsIndex({collection: this._cocktails});
    this._swapView(view);
  },

  _swapView: function (view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$el.html(view.render().$el);
  }
});
