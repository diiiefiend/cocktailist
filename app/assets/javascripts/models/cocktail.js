Cocktailist.Models.Cocktail = Backbone.BetterModel.extend({
  urlRoot: 'api/cocktails/',

  bar: function (){
    this._bar = this._bar || "";
    return this._bar;
  },

  ratings: function (){
    if(!this._ratings){
      this._ratings = new Cocktailist.Collections.Ratings([], {cocktail: this});
    };
    return this._ratings.sort();
  },

  userRatingId: function (){
    this._userRatingId = this._userRatingId || -1;
    return this._userRatingId;
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
      this.ratings().set(res.ratings);    //add parse: true later if needed
      delete res.ratings;
    };
    if(res.user_rating_id){
      this._userRatingId = res.user_rating_id;
      delete res.user_rating_id;
    };
    return res;
  }

});
