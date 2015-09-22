Cocktailist.Models.List = Backbone.Model.extend({
  urlRoot: function(){
    return 'api/users/'+ this.user.id +'/lists';
  },

  initialize: function (models, options){
    this.user = options.user;
  },

  toJSON: function (){
    return {list: _.clone(this.attributes)};
  }

});
