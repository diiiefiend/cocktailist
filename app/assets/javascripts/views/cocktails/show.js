Cocktailist.Views.CocktailShow = Backbone.CompositeView.extend({
  template: JST['cocktails/show'],

  initialize: function (){
    //model: cocktail
    //collection: cocktails
    this._ratings = this.model.ratings();
    this.listenToOnce(this.collection, "sync", this.setSimilarCocktail);
    this.listenTo(this.model, "sync afterSimilarCocktail", this.render);
    this.listenTo(this._ratings, "add change afterRemove", this.renderForm);
    this.listenTo(this._ratings, "update change", this.renderRatings); //later optimize this to only render the new comment?
  },

  setSimilarCocktail: function (){
    var similarCocktails = this.collection.where({liquor: this.model.get('liquor')});
    this._similarCocktail = this.collection.getOrFetch(similarCocktails[Math.floor(Math.random() * similarCocktails.length)], {
        success: function (){
          this.model.trigger("afterSimilarCocktail");
        }.bind(this)
      }
    );
  },

  render: function (){
    var template = this.template({cocktail: this.model, similarCocktail: this._similarCocktail});
    this.$el.html(template);

    this.renderForm();

    // this._ratings.each( function(rating){
    //   this.renderRatings(rating);
    // }.bind(this));

    this.renderRatings();

    return this;
  },

  renderForm: function (){
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
