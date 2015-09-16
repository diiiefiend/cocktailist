Cocktailist.Collections.Cocktails = Backbone.Collection.extend({
  url: 'api/cocktails/',
  model: Cocktailist.Models.Cocktail,

  getOrFetch: function (id){
    var collection = this;
    var model = collection.get(id);

    if(model !== undefined){
      model.fetch();
    } else {
      model = new collection.model({id: id});
      collection.add(model);
      model.fetch({
        error: function (){ collection.remove(model); }
      });
    };

    return model;
  }
});
