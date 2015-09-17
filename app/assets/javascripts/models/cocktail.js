Cocktailist.Models.Cocktail = Backbone.Model.extend({
  urlRoot: 'api/cocktails/',

  bar: function (){
    this._bar = this._bar || "";
    return this._bar;
  },

  ratings: function (){
    if(!this._ratings){
      this._ratings = new Cocktailist.Collections.Ratings([], {cocktail: this});
    };
    return this._ratings;
  },

  toJSON: function (){
    return {cocktail: _.clone(this.attributes)};
  },

  parse: function (res){
    if(res.bar){
      this._bar = (res.bar);
      delete res.bar;
    };
    if(res.ratings){
      this.ratings().set(res.ratings);
      delete res.ratings;
    };
    return res;
  }
});
