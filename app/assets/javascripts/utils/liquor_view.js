Backbone.LiquorView = Backbone.CompositeView.extend({

  _liquorTypes: function (){
    this._liquors = this._liquors || [];
    this.collection.each( function(cocktail){
      if(this._liquors.indexOf(cocktail.escape('liquor')) === -1){
        this._liquors.push(cocktail.escape('liquor'));
      };
    }.bind(this));
    return this._liquors.sort();
  }

});
