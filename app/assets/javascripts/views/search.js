// because this is super confusing: this view is for the search results page
Cocktailist.Views.Search = Backbone.LiquorView.extend({
  template: JST['search'],

  events: {
    "change .q" : "search",
  },

  initialize: function (options){
    this.searchResults = new Cocktailist.Collections.SearchResults();
    this.searchResults.pageNum = 1;
    this.origQ = options.q;
    this.listenTo(this.searchResults, "sync", this.render);
  },

  search: function (e){
    if (e) {
      e.preventDefault();
    };
    this.searchResults.query = $(".q").val() || this.origQ;
    this.searchResults.fetch({
      data: {
        query: this.searchResults.query,
      }
    });
  },

  render: function (){
    var groups = this.searchResults.groupBy(function (result){ return result.get("_type"); });
    var template = this.template({resultGroups: groups});
    this.$el.html(template);

    if(!this.searchResults.query){
      this.$(".q").val(this.origQ);
      this.search();
    } else {
      this.$(".q").val(this.searchResults.query);
    };

    window.setTimeout(function (){ Cocktailist.mainLoadAni.hide();}, 400);
    return this;
  }
});
