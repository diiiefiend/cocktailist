Cocktailist.Models.FeedItem = Backbone.Model.extend({
  urlRoot: 'api/feed/',

  toJSON: function (){
    return {feed: _.clone(this.attributes)};
  }
});
