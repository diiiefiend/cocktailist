Cocktailist.Views.Nav = Backbone.View.extend({
  template: JST['shared/nav'],

  initialize: function (options){
    this.listenTo(Cocktailist.currentUser, "signIn signOut", this.render);
    this.render();
  },

  render: function (){
    var template = this.template({currentUser: Cocktailist.currentUser});
    this.$el.html(template);
    return this;
  },

});
