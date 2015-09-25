Cocktailist.Models.Bar = Backbone.Model.extend({
  urlRoot: 'api/bar/',

  toJSON: function (){
    return {bar: _.clone(this.attributes)};
  }
});
