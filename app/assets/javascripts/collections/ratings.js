Cocktailist.Collections.Ratings = Backbone.BetterCollection.extend({
  model: Cocktailist.Models.Rating,
  url: 'api/ratings',

  initialize: function (models, options){
    this.cocktail = options.cocktail;
  }
});
