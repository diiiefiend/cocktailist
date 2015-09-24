Cocktailist.Models.User = Backbone.BetterModel.extend({
  urlRoot: "/api/users",

  username: function (){
    return this.escape('username');
  },

  toJSON: function (){
    return { user: _.clone(this.attributes) };
  }
});


Cocktailist.Models.CurrentUser = Cocktailist.Models.User.extend({
  url: "/api/session",

  initialize: function (){
    this.listenTo(this, "change", this.fireSessionEvent);
  },

  isSignedIn: function (){
    return !this.isNew();
  },

  signIn: function (options){
    var model = this;
    var credentials = {
      "user[email]": options.email,
      "user[password]": options.password
    };
    $.ajax({
      url: this.url,
      type: "POST",
      data: credentials,
      dataType: "json",
      success: function(data){
        model.set(data);
        options.success && options.success();
      },
      error: function(){
        options.error && options.error();
      }
    });
  },

  signOut: function (options){
    var model = this;
    $.ajax({
      url: this.url,
      type: "delete",
      dataType: "json",
      success: function (data){
        model.clear();
        options.success && options.success();
      }
    });
  },

  fireSessionEvent: function (){
    if(this.isSignedIn()){
      this.trigger("signIn");
      // console.log("currentUser is signed in!", this);
    } else {
      this.synced = false;
      this.trigger("signOut");
      // console.log("currentUser is signed out!", this);
    }
  }

});
