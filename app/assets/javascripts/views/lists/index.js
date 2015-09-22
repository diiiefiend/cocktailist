Cocktailist.Views.ListsIndex = Backbone.CompositeView.extend({
  template: JST['lists/index'],

  events: {
    "click .filter-list li a" : "changeList"
  },

  initialize: function(){
    //collection = lists
    this._user = Cocktailist.currentUser;
    this.listenTo(this.collection, "sync", this.render);
  },

  changeList: function (e){
    $link = $(e.currentTarget);
    if(!$link.hasClass("bolded")){
      if($link.text() === "Liquor"){
        this.render([],[], {filterList: this.liquorTypes(), filterType: "Liquors", groupFn: function (cocktail){ return cocktail.get("liquor"); }});
      } else if($link.text() === "Establishment"){
        this.render([],[], {filterList: this.bars(), filterType: "Establishments", groupFn: function (cocktail){ return cocktail.bar().name; }});
      };
    };
  },


  render: function (res, models, options){
    // var filterList = (options && options.filterList ? options.filterList : this.liquorTypes());
    // var filterType = (options && options.filterType ? options.filterType : "Liquors");
    // var groupType = (options && options.groupFn ? options.groupFn : function (cocktail){ return cocktail.get("liquor"); });
    // var groups = this.collection.groupBy(groupType);
    var template = this.template({user: this._user, collection: this.collection});
    this.$el.html(template);
    return this;
  }
});
