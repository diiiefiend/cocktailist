Cocktailist.Models.Cocktail = Backbone.Model.extend({
  urlRoot: 'api/cocktails/',

  LIQUORS: [
    "Whiskey",
    "Vodka",
    "Tequila",
    "Mezcal",
    "Bourbon",
    "Rum",
    "Gin",
    "Other"
  ],

  toJSON: function (){
    return {cocktail: _.clone(this.attributes)};
  }
});
