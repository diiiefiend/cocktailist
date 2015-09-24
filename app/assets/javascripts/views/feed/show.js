Cocktailist.Views.CocktailsFeed = Backbone.CompositeView.extend({
  template: JST['feed/show'],

  events: {
    "click .addEntry" : "showForm"
  },

  initialize: function (options){
    //collection = feedItems
    this._cocktails = options.cocktails;
    this.lists = options.lists;
    this.listenToOnce(this._cocktails, "sync", this.getLists);
    this.listenTo(this.lists, "sync", this.setRandomCocktail);
    this.listenTo(this.collection, "afterRandomCocktail", this.render);

    this._showForm = false;
  },

  getLists: function (e){
    this.lists.fetch();
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

  setRandomCocktail: function (){
    var arr = this._cocktails.pluck("id");
    this._randomCocktail = this._cocktails.get(arr[Math.floor(Math.random() * arr.length)]);
    this.collection.trigger("afterRandomCocktail");
  },

  render: function (){
    var template = this.template({feedItems: this.collection, randomCocktail: this._randomCocktail, lists: this.lists});
    this.$el.html(template);
    return this;
  }
});
