Cocktailist.Views.CocktailCat= Backbone.LiquorView.extend({
  template: JST['cocktails/catShow'],

  initialize: function (options){
    //collection: cocktails
    this.filterType = options.filterType;
    this.category = options.category;
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function (){
    var catCollection = this.collection.where({liquor : this.category});
    var template = this.template({category: this.category, cocktails: catCollection});
    this.$el.html(template);
    return this;
  }
});
