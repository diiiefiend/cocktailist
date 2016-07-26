Cocktailist.Views.Search = Backbone.LiquorView.extend({
  template: JST['search'],

  events: {
    "change .q" : "search",
    "click a.next-page" : "nextPage",
    "click a.prev-page" : "prevPage"
  },

  initialize: function (options){
    this.searchResults = new Cocktailist.Collections.SearchResults();
    this.searchResults.pageNum = 1;
    this.origQ = options.q;
    this.listenTo(this.searchResults, "sync", this.render);
  },

  search: function (e){
    if(e){
      e.preventDefault();
    };
    this.searchResults.pageNum = 1;
    this.searchResults.query = $(".q").val() || this.origQ;
    this.searchResults.fetch({
      data: {
        query: this.searchResults.query,
        page: 1
      }
    });
  },

  nextPage: function (e){
    this.searchResults.fetch({
        data: {
          query: this.searchResults.query,
          page: this.searchResults.pageNum + 1
        },
        success: function (){
          this.searchResults.pageNum = this.searchResults.pageNum + 1;
        }.bind(this)
    });
  },

  prevPage: function (e){
    this.searchResults.fetch({
        data: {
          query: this.searchResults.query,
          page: this.searchResults.pageNum - 1
        },
        success: function (){
          this.searchResults.pageNum = this.searchResults.pageNum - 1;
        }.bind(this)
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
