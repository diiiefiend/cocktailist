Cocktailist.Views.CocktailsFeed = Backbone.CompositeView.extend({
  template: {
    "main" : JST['feed/show'],
    "feed" : JST['feed/_feed'],
    "side" : JST['feed/_rside']
  },

  events: {
    "click .addEntry" : "showForm"
  },

  initialize: function (options){
    //collection = feedItems
    this._cocktails = options.cocktails;
    this.listenTo(this.collection, "sync", this.render);
    this._showForm = false;
  },

  showForm: function (e){
    if(this._showForm){
      this.render();
      this._showForm = false;
    } else {
      var newModel = new Cocktailist.Models.Cocktail();
      var view = new Cocktailist.Views.CocktailsNew({model: newModel, collection: this._cocktails});
      this.$el.find(".left").html(view.render().$el);
      this._showForm = true;
    };
  },

  render: function (){
    var template = this.template["main"]({feedItems: this.collection});
    this.$el.html(template);
    return this;
  }
});
