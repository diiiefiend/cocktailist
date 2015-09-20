Cocktailist.Views.CocktailShow = Backbone.CompositeView.extend({
  template: JST['cocktails/show'],

  initialize: function (){
    //model: cocktail
    this._ratings = this.model.ratings();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this._ratings, "sync add", this.renderForm);
    this.listenTo(this._ratings, "add remove update", this.renderRatings); //later optimize this to only render the new comment?
  },

  render: function (){
    var template = this.template({cocktail: this.model});
    this.$el.html(template);

    this.renderForm();

    // this._ratings.each( function(rating){
    //   this.renderRatings(rating);
    // }.bind(this));

    this.renderRatings();

    return this;
  },

  renderForm: function (){
    //need to trigger a refetch of the collection here somehow
    if(this.model.userRatingId() > -1){
      var rating = this._ratings.getOrFetch( this.model.userRatingId(), {cocktail: this.model} );
    } else {
      var rating = new Cocktailist.Models.Rating([], {cocktail: this.model});
    };
    var reviewFormView = new Cocktailist.Views.RatingForm({model: rating, collection: this._ratings, cocktail: this.model});
    this.$el.find("#rating-form").html(reviewFormView.render().$el);

    return this;
  },

  renderRatings: function (){
    this.$el.find("#reviews").empty();
    this._ratings.each( function(rating){
      var ratingShowView = new Cocktailist.Views.RatingShow({model: rating});
      this.$el.find("#reviews").prepend(ratingShowView.render().$el);
    }.bind(this));
    return this;
  }
});
