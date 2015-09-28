Backbone.BetterCollection = Backbone.Collection.extend({
  getOrFetch: function (id, options){
    var collection = this;
    var model = collection.get(id);
    if(model !== undefined){
      model.fetch(options);
    } else {
      model = new collection.model({id: id}, options);
      collection.add(model);
      model.fetch({ options: options,
        error: function (){ collection.remove(model); }
      });
    };

    return model;
  }
});
