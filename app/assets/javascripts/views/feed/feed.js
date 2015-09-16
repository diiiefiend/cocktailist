Cocktailist.Views.CocktailsFeed = Backbone.CompositeView.extend({
  template: JST['feed/show'],

  initialize: function (){
    //collection = feedItems
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function (){
    var template = this.template({feedItems: this.collection});
    this.$el.html(template);
    return this;
  }
});
