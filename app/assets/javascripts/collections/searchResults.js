Cocktailist.Collections.SearchResults = Backbone.BetterCollection.extend({
  url: "/api/search",

  parse: function (res){
    if(res.total_count){
      this.total_count = res.total_count;
    }
    return res.results;
  },

  model: function (attrs){
    var type = attrs._type;
    // delete attrs._type;

    return new Cocktailist.Models[type](attrs);
  }
});
