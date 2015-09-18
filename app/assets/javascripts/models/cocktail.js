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
    return this._ratings.sort();
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
    return res;
  },

  //after this works, put it in BetterModels class
  saveFormData: function(formData, options){
    var method = this.isNew() ? "POST" : "PUT";
    var model = this;
    $.ajax({
      url: _.result(model, "url"),
      type: method,
      data: formData,
      processData: false,
      contentType: false,
      success: function (data){
        model.set(model.parse(data));
        model.trigger('sync', model, data, options);
        options.success && options.success(model, data, options);
      },
      error: function (data){
        options.error && options.error(model, data, options);
      }
    });
  }

});
