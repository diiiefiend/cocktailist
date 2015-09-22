Cocktailist.Models.List = Backbone.Model.extend({
  urlRoot: function(){
    return 'api/users/'+ this.user.id +'/lists';
  },

  initialize: function (models, options){
    this.user = options.user;
    // debugger
  },

  listitems: function (){
    if(!this._listitems){
      this._listitems = new Cocktailist.Collections.Listitems([], {list: this});
    };
    return this._listitems.sort();
  },

  toJSON: function (){
    return {list: _.clone(this.attributes)};
  },

  parse: function (res){
    if(res.listitems){
      this.listitems().set(res.listitems);    //add parse: true later if needed
      delete res.listitems;
    };
    return res;
  }

});
