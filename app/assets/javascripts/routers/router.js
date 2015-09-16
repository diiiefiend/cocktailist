Cocktailist.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "index"
  },

  initialize: function (options){
    this.$el = options.$el;
    this.collection = new Cocktailist.Collections.Cocktails();
  },

  index: function (){
    this.collection.fetch();
    var view = new Cocktailist.Views.CocktailsIndex({collection: this.collection});
    this._swapView(view);
  },

  _swapView: function (view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$el.html(view.render().$el);
  }
});
