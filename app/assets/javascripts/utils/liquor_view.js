Backbone.LiquorView = Backbone.CompositeView.extend({

  liquorTypes: function (arr){
    this._liquors = this._liquors || [];
    var arrLiquors;
    if(arr){
      // passing in array of cocktails
      arrLiquors = arr.map(function (cocktail){
        return cocktail.get('liquor');
      });
    } else {
      arrLiquors = this.collection.pluck('liquor');
    };

    this._liquors = _.unique(arrLiquors);

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

    this._bars = _.unique(arrBars);

    return this._bars.sort();
  }
});
