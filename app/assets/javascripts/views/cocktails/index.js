Cocktailist.Views.CocktailsIndex = Backbone.CompositeView.extend({
  template: JST['cocktails/index'],

  initialize: function(){
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function (){
    var template = this.template({cocktails: this.collection});
    this.$el.html(template);
    return this;
  }
});
