Cocktailist.Views.ListitemIndex = Backbone.CompositeView.extend(
  _.extend({}, Cocktailist.Mixins.InfiniteScroll, {
    template: JST['lists/listitemIndex'],

    initialize: function (options){
      //model: list
      //collection: list.listitems()
      this.collection = options.collection;
      this.model = options.model;

      // this.bindScroll();          //work on this later

      this.model.user = Cocktailist.currentUser;
      this.collection.list = this.model;

      this.collection.pageNum = 1;
    },

    render: function (){
      var template = this.template({list: this.model, listitems: this.collection});
      this.$el.html(template);
      return this;
    }
  })
);
