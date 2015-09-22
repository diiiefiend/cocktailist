Cocktailist.Collections.Ratings = Backbone.BetterCollection.extend({
  model: Cocktailist.Models.Rating,

  url: function(){
    return 'api/cocktails/'+ this.cocktail.id +'/ratings'
  },

  comparator: function (rating){
    return rating.get('created_at');
  },

  initialize: function (models, options){
    this.cocktail = options.cocktail;
  }
});
