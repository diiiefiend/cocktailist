Cocktailist.Views.CocktailsIndex = Backbone.LiquorView.extend({
  template: JST['cocktails/index'],

  initialize: function(){
    //collection = cocktails
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function (res, models, options){
    var filterList = (options && options.filterList ? options.filterList : this.liquorTypes());
    var filterType = (options && options.filterType ? options.filterType : "Spirits");
    var liquorGroups = this.collection.groupBy(function (cocktail){
      return cocktail.get("liquor");
    });
    var template = this.template({groups: liquorGroups, list: filterList, filterType: filterType});
    this.$el.html(template);
    return this;
  }
});
