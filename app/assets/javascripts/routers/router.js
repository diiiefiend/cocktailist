Cocktailist.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "feed",
    "_=_" : "redirectToFeed",
    "browse" : "browse",
    "browse/:filterType/:category" : "browseCat",
    "lists" : "lists",
    "lists/:id" : "showList",

    "cocktails/new" : "createEntry",
    "cocktails/:id" : "showEntry",
    "cocktails/edit/:id" : "editEntry",

    "search/:query" : "search",

    "users/new": "newUser",
    "users/:id": "showUser",
    "session/new": "signIn"
  },

  initialize: function (options){
    this.$el = options.$el;
    this._cocktails = new Cocktailist.Collections.Cocktails();
    this._feedItems = new Cocktailist.Collections.FeedItems();
    this._lists = new Cocktailist.Collections.Lists([], {user: Cocktailist.currentUser});

    this._users = new Cocktailist.Collections.Users();
  },

  redirectToFeed: function (){
    Backbone.history.navigate("", {trigger: true});
  },

  feed: function (){
    var callback = this.feed.bind(this);
    if (!this._requireSignedIn(callback, {wait: true})) { return; } //if not signed in, return

    this._feedItems.fetch();
    this._cocktails.fetch();
    var view = new Cocktailist.Views.CocktailsFeed({collection: this._feedItems, cocktails: this._cocktails, lists: this._lists});
    this._swapView(view, {wait: true, iScroll: true});
  },

  createEntry: function (){
    var callback = this.createEntry.bind(this);
    if (!this._requireSignedIn(callback)) { return; } //if not signed in, return

    var entry = new Cocktailist.Models.Cocktail();
    this._cocktails.fetch();
    var view = new Cocktailist.Views.CocktailsForm({model: entry, collection: this._cocktails});
    this._swapView(view, {wait: true});
  },

  editEntry: function (id){
    var callback = this.editEntry.bind(this);
    if (!this._requireSignedIn(callback)) { return; } //if not signed in, return

    var entry = this._cocktails.getOrFetch(id);
    var view = new Cocktailist.Views.CocktailsForm({model: entry, collection: this._cocktails});
    this._swapView(view, {wait: true});
  },

  showEntry: function (id){
    var entry = this._cocktails.getOrFetch(id);
    var view = new Cocktailist.Views.CocktailShow({model: entry, collection: this._cocktails, lists: this._lists});
    this._swapView(view, {wait: true});
  },

  browse: function (){
    this._cocktails.fetch();
    var view = new Cocktailist.Views.CocktailsIndex({collection: this._cocktails});
    this._swapView(view, {wait: true});
  },

  browseCat: function (filterType, category){
    this._cocktails.fetch();
    var view = new Cocktailist.Views.CocktailCat({collection: this._cocktails, filterType: filterType, category: category});
    this._swapView(view, {wait: true});
  },

  //lists stuff
  lists: function (options){
    var callback = this.lists.bind(this);
    if (!this._requireSignedIn(callback)) { return; } //if not signed in, return
    //possibly can pass in Cocktailist.currentUser and save all the trouble with the user fetch thing?
    var view = new Cocktailist.Views.ListsIndex({collection: this._lists, options});
    this._swapView(view, {wait: true});
  },

  showList: function (id){
    var callback = this.lists.bind(this);
    if (!this._requireSignedIn(callback)) { return; } //if not signed in, return

    this.lists({listShowId: parseInt(id)});
  },

  //search

  search: function (query){
    var view = new Cocktailist.Views.Search({q: query});
    this._swapView(view);
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
    this._swapView(view, {wait: true});
  },

  signIn: function(callback, wait){
    if (!this._requireSignedOut(callback)) { return; }    //if not signed out, return

    var view = new Cocktailist.Views.SignIn({
      callback: callback, wait: true
    });
    if(wait){
      this._swapView(view, {wait: true});
    } else {
      this._swapView(view);
    };
  },


// "private" methods

  _requireSignedIn: function(callback, wait){
    if (!Cocktailist.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      this.signIn(callback, wait);
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

  _swapView: function (view, options, otherView){
    if(options && options.iScroll !== true){
      $(window).unbind();                 //get rid of infinite scrolling listener
    };
    this._currentView && this._currentView.remove();
    this._currentView = view;
    if(options && options.wait === true){
      this.$el.html(view.$el);              //don't render right away
    } else {
      this.$el.html(view.render().$el);
    };
  }
});
