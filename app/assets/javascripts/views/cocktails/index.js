Cocktailist.Views.CocktailsIndex = Backbone.LiquorView.extend({
  template: JST['cocktails/index'],

  events: {
    "click .filter-list li a" : "changeFilter"
  },

  initialize: function(){
    //collection = cocktails
    this.listenTo(this.collection, "sync", this.render);
  },

  changeFilter: function (e){
    $link = $(e.currentTarget);
    if(!$link.hasClass("bolded")){
      if($link.text() === "Spirit"){
        this.render([],[], {filterList: this.liquorTypes(), filterType: "Spirits", groupFn: function (cocktail){ return cocktail.get("liquor"); }});
      } else if($link.text() === "Bar"){
        this.render([],[], {filterList: this.bars(), filterType: "Bars", groupFn: function (cocktail){ return cocktail.bar().name; }});
      };
    };
  },


  render: function (res, models, options){
    var filterList = (options && options.filterList ? options.filterList : this.liquorTypes());
    var filterType = (options && options.filterType ? options.filterType : "Spirits");
    var groupType = (options && options.groupFn ? options.groupFn : function (cocktail){ return cocktail.get("liquor"); });
    var groups = this.collection.groupBy(groupType);
    var template = this.template({groups: groups, list: filterList, filterType: filterType});
    this.$el.html(template);
    return this;
  }
});
