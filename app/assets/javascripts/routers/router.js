Cocktailist.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "feed",
    "browse" : "browse",
    "cocktails/new" : "createEntry",
    "cocktails/:id" : "showEntry",
    "cocktails/:id/edit" : "editEntry"
  },

  initialize: function (options){
    this.$el = options.$el;
    this._cocktails = new Cocktailist.Collections.Cocktails();
    this._feedItems = new Cocktailist.Collections.FeedItems();
  },

  feed: function (){
    this._feedItems.fetch();
    this._cocktails.fetch();
    var view = new Cocktailist.Views.CocktailsFeed({collection: this._feedItems, cocktails: this._cocktails});
    this._swapView(view);
  },

  createEntry: function (){
    var entry = new Cocktailist.Models.Cocktail();
    var view = new Cocktailist.Views.CocktailsForm({model: entry});
    this._swapView(view);
  },

  editEntry: function (){
    var entry = this.collection.getOrFetch(id);
    var view = new Cocktailist.Views.CocktailsForm({model: entry});
    this._swapView(view);
  },

  showEntry: function (id){
    var entry = this._cocktails.getOrFetch(id);
    var view = new Cocktailist.Views.CocktailShow({model: entry});
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
