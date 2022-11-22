// this view is for the search box at the top
Cocktailist.Views.Searchbox = Backbone.View.extend({
  template: JST['shared/searchbox'],

  events: {
    "change .header-search" : "goToSearch"
  },

  initialize: function (){
    this.render();
  },

  goToSearch: function (e){
    e.preventDefault();
    Backbone.history.navigate("search/" + escape(this.$(".header-search").val()), {trigger: true});
    this.$(".header-search").val("");
  },

  render: function (){
    var template = this.template();
    this.$el.html(template);
    return this;
  }
});
