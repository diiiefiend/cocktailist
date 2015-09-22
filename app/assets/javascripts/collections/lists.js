Cocktailist.Collections.Lists = Backbone.BetterCollection.extend({
  model: Cocktailist.Models.List,

  url: function(){
    return 'api/users/'+ this.user.id +'/lists'
  },

  comparator: function (list){
    return list.get('updated_at');
  },

  initialize: function (models, options){
    this.user = options.user;
  }
});
