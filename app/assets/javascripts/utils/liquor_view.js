Backbone.LiquorView = Backbone.CompositeView.extend({

  liquorTypes: function (){
    this._liquors = this._liquors || [];
    this.collection.each( function(cocktail){
      if(this._liquors.indexOf(cocktail.escape('liquor')) === -1){
        this._liquors.push(cocktail.escape('liquor'));
      };
    }.bind(this));
    return this._liquors.sort();
  },

  bars: function (){
    this._bars = this._bars || {};
    this.collection.each( function(cocktail){
      if(!this._bars.hasOwnProperty(cocktail.bar().id)){
        this._bars[cocktail.bar().id] = (cocktail.bar().name);
      };
    }.bind(this));
    //trying to sort, but not really working. figure it out later
    // this._bars = Object.values(this._bars).sort( function (a,b){
    //   return this._bars[a]-this._bars[b];
    // }.bind(this));
    return this._bars;
  }
});
