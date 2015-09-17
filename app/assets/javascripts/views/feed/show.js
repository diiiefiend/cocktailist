Cocktailist.Views.CocktailsFeed = Backbone.CompositeView.extend({
  template: JST['feed/show'],

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
      this._form.remove();
      this.render();
      this._showForm = false;
    } else {
      var newModel = new Cocktailist.Models.Cocktail();
      this._form = new Cocktailist.Views.CocktailsForm({model: newModel, collection: this._cocktails});
      this.$el.find(".left").html(this._form.render().$el);
      this.$el.find("a.addEntry").text("Cancel");
      this._showForm = true;
    };
  },

  render: function (){
    var template = this.template({feedItems: this.collection});
    this.$el.html(template);
    return this;
  }
});
