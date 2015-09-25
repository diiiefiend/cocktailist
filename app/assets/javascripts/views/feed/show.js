Cocktailist.Views.CocktailsFeed = Backbone.CompositeView.extend(
  _.extend({}, Cocktailist.Mixins.InfiniteScroll, {
    template: JST['feed/show'],

    events: {
      "click .addEntry" : "showForm"
    },

    initialize: function (options){
      //collection = feedItems

      Cocktailist.siteNav.setActive("feed");

      this._cocktails = options.cocktails;
      this.lists = options.lists;
      this.listenToOnce(this._cocktails, "sync", this.getLists);
      this.listenTo(this.lists, "sync", this.setRandomCocktail);
      this.listenTo(this.collection, "afterRandomCocktail sync", this.render);


      this._showForm = false;
      this.bindScroll();
      this.collection.pageNum = 1;
    },

    getLists: function (e){
      this.lists.fetch();
    },

    showForm: function (e){
      if(this._showForm){
        this._form.remove();
        Cocktailist.siteNav.setActive("feed");
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
      window.setTimeout(function (){ $(".loader").hide();}, 600);
      return this;
    }
  })
);
