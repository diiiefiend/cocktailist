Cocktailist.Views.CocktailCat= Backbone.LiquorView.extend({
  template: JST['cocktails/catShow'],

  events: {
    "click .filter-list a" : "filterBar",
    "click a.subtext" : "showAll"
  },

  initialize: function (options){
    //collection: cocktails
    this.filterType = options.filterType;
    this.category = options.category;
    this.listenTo(this.collection, "sync", this.setCatColl);
  },

  setCatColl: function (){
    this.catCollection = this.collection.where({liquor : this.category});
    this.render();
  },

  filterBar: function (e){
    targetBar = $(e.currentTarget).text();
    var coll = this.catCollection.filter(function (el){
      return el.bar().name === targetBar;
    });
    this.render(coll, targetBar);
  },

  showAll: function (e){
    this.render();
  },

  render: function (coll, targetBar){
    var cocktails = coll || this.catCollection;
    var liquors = this.liquorTypes();
    var bars = this.bars(this.catCollection);
    var template = this.template({category: this.category, cocktails: cocktails, liquors: liquors, bars: bars, targetBar: targetBar});
    this.$el.html(template);
    return this;
  }
});
