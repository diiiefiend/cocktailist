Cocktailist.Views.CocktailsFeed = Backbone.CompositeView.extend(
  _.extend({}, Cocktailist.Mixins.InfiniteScroll, {
    template: {
      main: JST['feed/show'],
      feed: JST['feed/_feedLeft'],
      sidebar: JST['feed/_feedRight']
    },

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
      this.listenTo(this.collection, "afterRandomCocktail", this.render);
      this.listenToOnce(this.collection, "sync", this.setFeedFilters);
      this.listenTo(this.collection, "sync", this.renderFeed);

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

    setFeedColl: function (){
      this._feedColl = this.collection.filter(function (item){
        return _.contains(this._feedFilters, item.get("activity"));
      }.bind(this));
    },

    filterFeed: function (e){
      this._feedFilters = $("#feed-filter-list").find("input:checked").map(function (){
          return this.value;
      });
      this.renderFeed();
    },

    renderFeed: function (){
      this.setFeedColl();
      var template = this.template['feed']({
        feedItems: this._feedColl
      });

      this.$el.find(".left").html(template);
    },

    renderSide: function (){
      var template = this.template['sidebar']({
        feedTypes: this._feedTypes,
        feedFilters: this._feedFilters,
        randomCocktail: this._randomCocktail,
        lists: this.lists
      });

      this.$el.find(".right").html(template);
    },

    render: function (){
      var template = this.template['main']();
      this.$el.html(template);

      this.renderFeed();
      this.renderSide();

      window.setTimeout(function (){
        $(".loader").hide();
        $(document).trigger("pageLoaded");
      }, 600);

      return this;
    }
  })
);
