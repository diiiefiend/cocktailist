Cocktailist.Views.SignIn = Backbone.CompositeView.extend({
  template: JST['shared/signIn'],
  className: "siCont",

  events: {
    "submit form" : "submit",
    "click .switch" : "slideOut",
    "click .guest-login" : "loginAsGuest"
  },

  initialize: function (options){
    window.setTimeout(function (){ $(".loader").hide();}, 0);
    this.callback = options.callback;
    this.listenTo(Cocktailist.currentUser, "signIn", this.signInCallback);

    this.listenTo(Cocktailist.currentUser, "transition", this.slideIn);

    this.displayed = false;

    if(options.wait){
      this.listenTo(Cocktailist.currentUser, "sync", this.checkStatus);
    } else {
      this.displayed=true;
    };

  },

  slideIn: function (){
    this.render();
    this.$("#signinbox").removeClass("exit");
    this.displayed = true;
  },

  slideOut: function (e){
    e.preventDefault();
    this.$("#signinbox").addClass("exit");
    window.setTimeout(function (){Backbone.history.navigate("users/new", {trigger: true});}, 500);
    window.setTimeout(function (){Cocktailist.currentUser.trigger("transition2");}, 600);
  },

  checkStatus: function (){
    if(!Cocktailist.currentUser.isSignedIn()){
      this.slideIn();
    };
  },

  render: function (){
    this.$el.html(this.template({displayed: this.displayed}));
    return this;
  },

  loginAsGuest: function (e){
    e.preventDefault();
    this.$el.find("input[name='user[email]']").val("guest@aa.io");
    this.$el.find("input[name='user[password]']").val("password");
    this.$el.find("form").trigger("submit");
  },

  submit: function (e){
    e.preventDefault();
    var $form = $(e.currentTarget);
    var formData = $form.serializeJSON().user;
    Cocktailist.currentUser.signIn({
      email: formData.email,
      password: formData.password,
      error: function(){
        alert("Wrong username/password combination. Please try again.");
      }
    });
  },

  signInCallback: function (){
    if(this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate("", { trigger: true });
    }
  }

});
