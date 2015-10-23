Cocktailist.Views.RatingShow = Backbone.CompositeView.extend({
  template: JST['ratings/show'],

  showRating: function (){
    var $cont = this.$el.find(".rating");
    $cont.empty();
    for(var i=0; i < Math.floor(this.model.escape('rating')); i++){
      $cont.append("<img src='https://s3.amazonaws.com/cocktailist-pro/cocktails/imgs/rating-full.png'>");
    };
  },

  render: function (){
    var template = this.template({rating: this.model});
    this.$el.html(template);
    this.showRating();
    return this;
  }
});
