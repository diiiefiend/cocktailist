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
      this.listenTo(this.collection, "afterRandomCocktail sync", this.render);


      this._showForm = false;
      this.bindScroll();
      this.collection.pageNum = 1;
    },

    getLists: function (){
      this.lists.fetch();
    },

    filterFeed: function (e){
      // get values of all checked items in filter-feed-list
      // filter feed collection for all items with these activity values
      // make sure on infinite scroll that it refilters for these values
      var selected = $("#feed-filter-list").find("input:checked").map(function (){
          return this.value;
      });

      var coll = this.collection.filter(function (item){
        return _.contains(selected, item.get("activity"));
      });

      this.render(coll, selected);
    },

    setRandomCocktail: function (){
      var arr = this._cocktails.pluck("id");
      this._randomCocktail = this._cocktails.get(arr[Math.floor(Math.random() * arr.length)]);
      this.collection.trigger("afterRandomCocktail");
    },

    render: function (coll, feedFilters){
      var feedItems = coll || this.collection.models;
      var feedTypes = _.unique(this.collection.pluck("activity"));
      feedFilters = feedFilters || feedTypes;

      var template = this.template({
        feedItems: feedItems,
        feedTypes: feedTypes,
        feedFilters: feedFilters,
        randomCocktail: this._randomCocktail,
        lists: this.lists
      });
      this.$el.html(template);
      window.setTimeout(function (){ $(".loader").hide();}, 600);
      return this;
    }
  })
);
