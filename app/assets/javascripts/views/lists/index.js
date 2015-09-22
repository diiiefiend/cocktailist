Cocktailist.Views.ListsIndex = Backbone.CompositeView.extend({
  template: JST['lists/index'],

  events: {
    "click .filter-list li a" : "changeList"
  },

  initialize: function(){
    //collection = lists
    this.collection.fetch();
    this._user = Cocktailist.currentUser;
    this.listenTo(this._user, "sync", this.render);
    this.listenToOnce(this.collection, "sync", this.render);  //fix the infinite rendering tmrw
  },

  changeList: function (e){
    $link = $(e.currentTarget);
    if(!$link.hasClass("bolded")){
      // if($link.text() === "Liquor"){
      //   this.render([],[], {filterList: this.liquorTypes(), filterType: "Liquors", groupFn: function (cocktail){ return cocktail.get("liquor"); }});
      // } else if($link.text() === "Establishment"){
      //   this.render([],[], {filterList: this.bars(), filterType: "Establishments", groupFn: function (cocktail){ return cocktail.bar().name; }});
      // };
    };
  },

  render: function (res, models, options){
    // var filterList = (options && options.filterList ? options.filterList : this.liquorTypes());
    var listShowId = (options && options.listShowId ? options.listShowId : 1);
    // debugger
    var model = this.collection.getOrFetch(listShowId, {user: this._user});
    // var groupType = (options && options.groupFn ? options.groupFn : function (cocktail){ return cocktail.get("liquor"); });
    // var groups = this.collection.groupBy(groupType);
    var template = this.template({user: this._user, lists: this.collection, list: model, listShowId: listShowId});
    this.$el.html(template);
    return this;
  }
});
