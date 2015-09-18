Cocktailist.Collections.Ratings = Backbone.BetterCollection.extend({
  model: Cocktailist.Models.Rating,

  comparator: function (rating){
    return rating.get('created_at');
  },

  url: function(){
    return 'api/cocktails/'+ this.cocktail.id +'/ratings'
  },

  initialize: function (models, options){
    this.cocktail = options.cocktail;
  }
});
