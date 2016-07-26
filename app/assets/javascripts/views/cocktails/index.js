Cocktailist.Views.CocktailsIndex = Backbone.LiquorView.extend({
  template: {
    "main" : JST['cocktails/index'],
    "sidebar" : JST['cocktails/_indexSidebar'],
  },

  events: {
    "click .filter-list li a" : "changeFilter",
    "mouseenter .category-show-list li" : "activateBounce",
    "mouseleave .category-show-list li" : "activateStopBounce"
  },

  initialize: function(){
    //collection = cocktails
    this.latestLimit = 10;

    Cocktailist.siteNav.setActive("browse");

    this.listenTo(this.collection, "sync", this.render);
  },

  changeFilter: function (e){
    $link = $(e.currentTarget);
    if(!$link.hasClass("bolded")){
      if($link.text() === "Liquor"){
        this.renderSide({
          filterList: this.liquorTypes(),
          filterType: "liquor",
          groupFn: function (cocktail){
            return cocktail.get("liquor");
          }
        });
      } else if($link.text() === "Bar"){
        this.renderSide({
          filterList: this.bars(),
          filterType: "bar",
          groupFn: function (cocktail){
            return cocktail.bar().name;
          }
        });
      };
    };
  },

  activateBounce: function (e){
    var markerName = $(e.currentTarget).data("markername");
    this.bounce(markerName);
  },

  activateStopBounce: function (e){
    var markerName = $(e.currentTarget).data("markername");
    this.stopBounce(markerName);
  },

  renderMap: function (cocktails){
    //google maps stuff
    var goToBar = function (e){
      var barName = $(e.currentTarget).text();
      Backbone.history.navigate("browse/bar/" + barName, {trigger: true});
    };

    var map = this.setUpMap('bar-map', cocktails, this.latest, 'added', goToBar);
  },

  renderSide: function (options){
    var filterList = (options && options.filterList ? options.filterList : this.liquorTypes());
    var filterType = (options && options.filterType ? options.filterType : "liquor");

    var template = this.template['sidebar']({list: filterList, filterType: filterType});
    this.$el.find('.right').html(template);
  },


  render: function (res, models, options){
    this.latestLimit = (this.collection.length > this.latestLimit) ? this.latestLimit : this.collection.length;
    this.latest = this.collection.slice(0, this.latestLimit);
    var template = this.template['main']({latest: this.latest});
    this.$el.html(template);

    this.renderMap(this.latest);
    this.renderSide(options);

    $(document).trigger("pageLoaded");

    window.setTimeout(function (){ Cocktailist.mainLoadAni.hide();}, 400);
    return this;
  }
});
