Cocktailist.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "index"
  },

  initialize: function (options){
    this.$el = options.$el;
    this.collection = new Cocktailist.Collections.Cocktails();
  },

  index: function (){
    var view = new Cocktailist.Views.Index({collection: this.collection});
    this._swapView(view);
  },

  _swapView: function (view){

  }
});
