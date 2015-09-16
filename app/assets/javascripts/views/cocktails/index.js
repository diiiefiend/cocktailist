Cocktailist.Views.CocktailsIndex = Backbone.LiquorView.extend({
  template: JST['cocktails/index'],

  initialize: function(){
    //collection = cocktails
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function (){
    var template = this.template({cocktails: this.collection});
    this.$el.html(template);
    return this;
  }
});
