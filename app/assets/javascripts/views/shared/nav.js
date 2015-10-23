Cocktailist.Views.Nav = Backbone.View.extend({
  template: JST['shared/nav'],

  initialize: function (options){
    this.listenTo(Cocktailist.currentUser, "signIn signOut", this.setSection);
    this.render();
  },

  setActive: function (section){
      this.render(section);
  },

  setSection: function (){
    this.render("browse");
  },

  render: function (section){
    var template = this.template({currentUser: Cocktailist.currentUser, section: section});
    this.$el.html(template);
    return this;
  },

});
