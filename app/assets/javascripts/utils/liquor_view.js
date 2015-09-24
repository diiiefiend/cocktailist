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

  bars: function (collection){
    this._bars = this._bars || [];
    if(collection){
      collection.forEach( function(cocktail){
        if(this._bars.indexOf(cocktail.bar().name) === -1){
          this._bars.push(cocktail.bar().name);
        };
      }.bind(this));
    } else {
      this.collection.each( function(cocktail){
        if(this._bars.indexOf(cocktail.bar().name) === -1){
          this._bars.push(cocktail.bar().name);
        };
      }.bind(this));
    };

    return this._bars.sort();
  },

  //for file input form resets
  resetFormElement: function ($e) {
    $e.wrap('<form>').closest('form').get(0).reset();
    $e.unwrap();
  }
});
