Cocktailist.Views.CocktailCat= Backbone.LiquorView.extend({
  template: {
    "main" : JST['cocktails/catShow'],
    "liquorTemp" : JST['cocktails/_catShowLiquor'],
    "barTemp" : JST['cocktails/_catShowBar']
  },

  events: {
    "click .filter-list a" : "filter",
    "click a.subtext" : "showAll"
  },

  initialize: function (options){
    //collection: cocktails
    this.filterType = options.filterType;
    this.category = options.category;
    this.listenTo(this.collection, "sync", this.setCatColl);
  },

  setCatColl: function (){
    if(this.filterType === 'liquor'){
      this.category = (this.category === "switch" ? this.collection.at(0).get('liquor') : this.category);
      this.catCollection = this.collection.where({liquor : this.category});
    } else if(this.filterType === 'bar'){
      this.category = (this.category === "switch" ? this.collection.at(0).bar().name : this.category);
      this.catCollection = [];
      this.collection.models.forEach(function (model){
        if(model.bar().name === this.category){
          this.catCollection.push(model);
        };
      }.bind(this));
    };
    this.render();
  },

  filter: function (e){
    target = $(e.currentTarget).text();
    if(this.filterType==='liquor'){
      var coll = this.catCollection.filter(function (el){
        return el.bar().name === target;
      });
    } else if (this.filterType==='bar'){
      var coll = this.catCollection.filter(function (el){
        return el.get('liquor') === target;
      });
    };
    this.render(coll, target);
  },

  showAll: function (e){
    this.render();
  },

  render: function (coll, target){
    var cocktails = coll || this.catCollection;

    var main = this.template['main']({category: this.category, cocktails: cocktails});
    this.$el.html(main);

    if(this.filterType === 'liquor'){
      var liquors = this.liquorTypes();
      var bars = this.bars(this.catCollection);
      var temp = this.template['liquorTemp']({category: this.category, liquors: liquors, bars: bars, target: target});
    } else if(this.filterType === 'bar'){
      var liquors = this.liquorTypes(this.catCollection);
      var bars = this.bars();
      var temp = this.template['barTemp']({category: this.category, liquors: liquors, bars: bars, target: target});
    };

    this.$el.find(".right").html(temp);
    return this;
  }
});
