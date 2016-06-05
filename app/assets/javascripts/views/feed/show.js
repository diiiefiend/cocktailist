Cocktailist.Views.CocktailsFeed = Backbone.CompositeView.extend(
  _.extend({}, Cocktailist.Mixins.InfiniteScroll, {
    template: JST['feed/show'],

    events: {
      "click #feed-filter-list label.checkbox" : "filterFeed"
    },

    initialize: function (options){
      //collection = feedItems

      Cocktailist.siteNav.setActive("feed");

      this._cocktails = options.cocktails;
      this.lists = options.lists;
      this.listenToOnce(this._cocktails, "sync", this.getLists);
      this.listenTo(this.lists, "sync", this.setRandomCocktail);
      this.listenToOnce(this.collection, "sync", this.setFeedFilters);
      this.listenTo(this.collection, "afterRandomCocktail sync", this.render);

      this._showForm = false;
      this.bindScroll();
      this.collection.pageNum = 1;
    },

    getLists: function (){
      this.lists.fetch();
    },

    setRandomCocktail: function (){
      var arr = this._cocktails.pluck("id");
      this._randomCocktail = this._cocktails.get(arr[Math.floor(Math.random() * arr.length)]);
      this.collection.trigger("afterRandomCocktail");
    },

    setFeedFilters: function (){
      this._feedTypes = _.unique(this.collection.pluck("activity"));
      this._feedFilters = this._feedTypes;
    },

    filterFeed: function (e){
      this._feedFilters = $("#feed-filter-list").find("input:checked").map(function (){
          return this.value;
      });
      this.render();
    },

    render: function (){
      var feedItems = this.collection.filter(function (item){
        return _.contains(this._feedFilters, item.get("activity"));
      }.bind(this));

      var template = this.template({
        feedItems: feedItems,
        feedTypes: this._feedTypes,
        feedFilters: this._feedFilters,
        randomCocktail: this._randomCocktail,
        lists: this.lists
      });

      this.$el.html(template);

      window.setTimeout(function (){ $(".loader").hide();}, 600);

      return this;
    }
  })
);
