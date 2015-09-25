Cocktailist.Collections.Listitems = Backbone.BetterCollection.extend({
  model: Cocktailist.Models.Listitem,

  url: function(){
    return 'api/users/'+ this.list.user.id +'/lists/' + this.list.id + '/listitems';
  },

  comparator: function (listitem){
    return listitem.get('updated_at');
  },

  initialize: function (models, options){
    this.list = options.list;
  },

  parse: function (res){
    return res.listitems;
  }
});
