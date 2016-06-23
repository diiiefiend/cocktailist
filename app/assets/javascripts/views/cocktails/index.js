Cocktailist.Views.CocktailsIndex = Backbone.LiquorView.extend({
  template: {
    "main" : JST['cocktails/index'],
    "sidebar" : JST['cocktails/_indexSidebar'],
  },

  events: {
    "click .filter-list li a" : "changeFilter"
  },

  initialize: function(){
    //collection = cocktails

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

  renderMap: function (){
    //write this, maybe factor out the renderMap from catShow to a mixin so can just use that
  },

  renderSide: function (options){
    var filterList = (options && options.filterList ? options.filterList : this.liquorTypes());
    var filterType = (options && options.filterType ? options.filterType : "liquor");

    var template = this.template['sidebar']({list: filterList, filterType: filterType});
    this.$el.find('.right').html(template);
  },


  render: function (res, models, options){
    var latestLimit = 10;
    latestLimit = (this.collection.length > latestLimit) ? latestLimit : this.collection.length;
    var latest = this.collection.slice(0, latestLimit);
    var template = this.template['main']({latest: latest});
    this.$el.html(template);

    this.renderMap();
    this.renderSide(options);

    $(document).trigger("pageLoaded");

    window.setTimeout(function (){ $(".loader").hide();}, 400);
    return this;
  }
});
