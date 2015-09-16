Cocktailist.Views.CocktailShow = Backbone.View.extend({
  template: JST['cocktails/show'],

  initialize: function (){
    //model: cocktail
    this.listenTo(this.model, "sync", this.render);
  },

  render: function (){
    var template = this.template({cocktail: this.model});
    this.$el.html(template);
    return this;
  }
});
