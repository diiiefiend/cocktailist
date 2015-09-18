Cocktailist.Views.RatingShow = Backbone.CompositeView.extend({
  template: JST['ratings/show'],

  render: function (){
    var template = this.template({rating: this.model});
    this.$el.html(template);
    return this;
  }
});
