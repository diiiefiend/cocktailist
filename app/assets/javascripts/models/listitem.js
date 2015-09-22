Cocktailist.Models.List = Backbone.Model.extend({
  urlRoot: function(){
    return 'api/users/'+ this.list.user.id +'/lists/' + this.list.id + '/listitems';
  },

  initialize: function (models, options){
    this.list = options.list;
  },

  toJSON: function (){
    return {listitem: _.clone(this.attributes)};
  }

});
