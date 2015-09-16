Cocktailist.Models.Cocktail = Backbone.Model.extend({
  urlRoot: 'api/cocktails/',

  toJSON: function (){
    return {cocktail: _.clone(this.attributes)};
  }
});
