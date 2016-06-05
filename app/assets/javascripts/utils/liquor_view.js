Backbone.LiquorView = Backbone.CompositeView.extend({

  liquorTypes: function (arr){
    this._liquors = this._liquors || [];
    var arrLiquors;
    if(arr){
      // passing in array of cocktails
      arrLiquors = arr.map(function (cocktail){
        return cocktail.escape('liquor');
      });
    } else {
      arrLiquors = this.collection.pluck('liquor');
    };

    this._liquors = Cocktailist.Util.unique(arrLiquors);

    return this._liquors.sort();
  },

  bars: function (arr){
    this._bars = this._bars || [];
    var arrBars;

    if(arr){
      arrBars = arr.map(function (cocktail){
        return cocktail.bar().name;
      });
    } else {
      arrBars = this.collection.map(function (cocktail){
        return cocktail.bar().name;
      });
    };

    this._bars = Cocktailist.Util.unique(arrBars);

    return this._bars.sort();
  }
});
