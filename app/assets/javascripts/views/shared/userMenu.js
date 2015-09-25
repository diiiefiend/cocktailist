Cocktailist.Views.UserMenu = Backbone.View.extend({
  template: JST['shared/userMenu'],

  events: {
    "click #logout-link": "signOut"
  },

  initialize: function (options){
    this.listenTo(Cocktailist.currentUser, "signIn signOut", this.render);
    this.render();
  },

  render: function (){
    var template = this.template({currentUser: Cocktailist.currentUser});
    this.$el.html(template);
    return this;
  },

  signOut: function (e){
    Cocktailist.currentUser.signOut({
      success: function (){
        Backbone.history.navigate("#session/new", {trigger: true});
        Cocktailist.currentUser.trigger("transition");
      }
    });
  }

});
