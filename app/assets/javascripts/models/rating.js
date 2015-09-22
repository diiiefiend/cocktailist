Cocktailist.Models.Rating = Backbone.Model.extend({
  urlRoot: function(){
    return 'api/cocktails/'+ this.cocktail.id +'/ratings';
  },

  initialize: function (models, options){
    this.cocktail = options.cocktail || options.collection.cocktail;
  },

  toJSON: function (){
    return {rating: _.clone(this.attributes)};
  }

  // parse: function (res){
  //   return res;
  // }
});
