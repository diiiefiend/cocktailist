Cocktailist.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "feed",
    "browse" : "browse",
    "lists" : "lists",

    "cocktails/new" : "createEntry",
    "cocktails/:id" : "showEntry",
    "cocktails/:id/edit" : "editEntry",

    "users/new": "newUser",
    "users/:id": "showUser",
    "session/new": "signIn",

    "lists/new" : "createList"
  },

  initialize: function (options){
    this.$el = options.$el;
    this._cocktails = new Cocktailist.Collections.Cocktails();
    this._feedItems = new Cocktailist.Collections.FeedItems();
    this._lists = new Cocktailist.Collections.Lists([], {user: Cocktailist.currentUser});

    this._users = new Cocktailist.Collections.Users();
    this._users.fetch();
  },

  feed: function (){
    var callback = this.feed;
    if (!this._requireSignedIn(callback.bind(this))) { return; } //if not signed in, return

    this._feedItems.fetch();
    this._cocktails.fetch();
    this._lists.fetch();
    var view = new Cocktailist.Views.CocktailsFeed({collection: this._feedItems, cocktails: this._cocktails});
    this._swapView(view);
  },

  createEntry: function (){
    var callback = this.feed.bind(this);
    if (!this._requireSignedIn(callback)) { return; } //if not signed in, return

    var entry = new Cocktailist.Models.Cocktail();
    var view = new Cocktailist.Views.CocktailsForm({model: entry, collection: this._cocktails});
    this._swapView(view);
  },

  editEntry: function (){   //currently not used
    var entry = this.collection.getOrFetch(id);
    var view = new Cocktailist.Views.CocktailsForm({model: newModel, collection: this._cocktails});
    this._swapView(view);
  },

  showEntry: function (id){
    var entry = this._cocktails.getOrFetch(id);
    var view = new Cocktailist.Views.CocktailShow({model: entry, collection: this._cocktails});
    this._swapView(view);
  },

  browse: function (){
    this._cocktails.fetch();
    var view = new Cocktailist.Views.CocktailsIndex({collection: this._cocktails});
    this._swapView(view);
  },

  //lists stuff
  lists: function (){
    var view = new Cocktailist.Views.ListsIndex({collection: this._lists});
    this._swapView(view, {wait: true});
  },

  createList: function (){

  },

  // user routes stuff

  newUser: function (){
    if(!this._requireSignedOut()) {return;}         //if not signed out, return
    var model = new this._users.model();
    var view = new Cocktailist.Views.UserForm({
      collection: this._users,
      model: model
    });
    this._swapView(view);
  },

  showUser: function(id){
    var callback = this.showUser.bind(this, id);      //if not signed in, return
    if (!this._requireSignedIn(callback)) { return; }

    var model = this._users.getOrFetch(id);
    var view = new Cocktailist.Views.UserShow({
      model: model
    });
    this._swapView(view);
  },

  signIn: function(callback){
    if (!this._requireSignedOut(callback)) { return; }    //if not signed out, return

    var view = new Cocktailist.Views.SignIn({
      callback: callback
    });
    this._swapView(view);
  },


// "private" methods

  _requireSignedIn: function(callback){
    if (!Cocktailist.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      this.signIn(callback);
      return false;
    }

    return true;
  },

  _requireSignedOut: function(callback){
    if (Cocktailist.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      callback();
      return false;
    }

    return true;
  },

  _goHome: function(){
    Backbone.history.navigate("", { trigger: true });
  },

  _swapView: function (view, options){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    if(options && options.wait === true){
      this.$el.html(view.$el);              //don't render right away
    } else {
      this.$el.html(view.render().$el);
    };
  }
});
