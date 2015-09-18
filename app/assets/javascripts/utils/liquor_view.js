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
    // hash version, not sorted
    // this._bars = this._bars || {};
    // this.collection.each( function(cocktail){
    //   if(!this._bars.hasOwnProperty(cocktail.bar().id)){
    //     this._bars[cocktail.bar().id] = (cocktail.bar().name);
    //   };
    // }.bind(this));

    this._bars = this._bars || [];
    this.collection.each( function(cocktail){
      if(this._bars.indexOf(cocktail.bar().name) === -1){
        this._bars.push(cocktail.bar().name);
      };
    }.bind(this));
    return this._bars.sort();
  },

  //for file input form resets
  resetFormElement: function ($e) {
    $e.wrap('<form>').closest('form').get(0).reset();
    $e.unwrap();
  }
});
