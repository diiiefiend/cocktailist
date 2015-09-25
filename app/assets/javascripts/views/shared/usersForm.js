Cocktailist.Views.UserForm = Backbone.CompositeView.extend({
  template: JST['shared/userForm'],

  events: {
    "submit form": "create"
  },

  initialize: function(options){
    //model: new User model
    //collection: all users
    this.callback = options.callback;
  },

  render: function(){
    this.$el.html(this.template());
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
