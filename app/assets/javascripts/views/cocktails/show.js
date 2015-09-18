Cocktailist.Views.CocktailShow = Backbone.CompositeView.extend({
  template: JST['cocktails/show'],

  initialize: function (){
    //model: cocktail
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.ratings(), "add remove", this.render); //later optimize this to only render the new comment?
  },

  render: function (){
    var template = this.template({cocktail: this.model});
    this.$el.html(template);

    var newRating = new Cocktailist.Models.Rating([], {cocktail: this.model});
    var reviewFormView = new Cocktailist.Views.RatingForm({model: newRating, collection: this.model.ratings(), cocktail: this.model});
    this.$el.find("#rating-form").html(reviewFormView.render().$el);

    this.model.ratings().each( function(rating){
      var ratingShowView = new Cocktailist.Views.RatingShow({model: rating});
      this.$el.find("#reviews").prepend(ratingShowView.render().$el);
    }.bind(this));

    return this;
  }
});
