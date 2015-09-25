Cocktailist.Views.UserForm = Backbone.CompositeView.extend({
  template: JST['shared/userForm'],
  className: "siCont",

  events: {
    "submit form": "create",
    "click .login" : "slideOut"
  },

  initialize: function(options){
    //model: new User model
    //collection: all users
    this.callback = options.callback;

    window.setTimeout(function (){ $(".loader").hide();}, 0);
    this.displayed = false;
    this.listenTo(Cocktailist.currentUser, "transition2", this.slideIn);
  },

  slideIn: function (){
    this.render();
    this.$("#signinbox").removeClass("exit");
    this.displayed = true;
  },

  slideOut: function (e){
    e.preventDefault();
    this.$("#signinbox").addClass("exit");
    window.setTimeout(function (){Backbone.history.navigate("session/new", {trigger: true});}, 500);
    window.setTimeout(function (){Cocktailist.currentUser.trigger("transition");}, 600);
  },

  render: function(){
    this.$el.html(this.template({displayed: this.displayed}));
    window.setTimeout(function (){ $(".loader").hide();}, 0);
    return this;
  },

  create: function (e){
    e.preventDefault();
    var $form = $(e.currentTarget);
    var formData = $form.serializeJSON().user;
    this.model.save( formData, {
      success: function (){
        Cocktailist.currentUser.fetch();
        this.collection.add(this.model, {merge: true});
        Backbone.history.navigate("", {trigger: true});
      }.bind(this),
      error: function(){
        alert("Could not create user. Please try again.");
      }
    });
  }
});
