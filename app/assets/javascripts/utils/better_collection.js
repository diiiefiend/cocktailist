Backbone.BetterCollection = Backbone.Collection.extend({
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
  //
  // reverseSort: function (sortByFunction){
  //   return function(left, right) {
  //     var l = sortByFunction(left);
  //     var r = sortByFunction(right);
  //
  //     if (l === void 0) return -1;
  //     if (r === void 0) return 1;
  //
  //     return l < r ? 1 : l > r ? -1 : 0;
  //   };
  // }
});
