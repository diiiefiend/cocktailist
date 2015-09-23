Cocktailist.Views.ListsIndex = Backbone.CompositeView.extend({
  template: {
    "main" : JST['lists/index'],
    "side" : JST['lists/_side']
  },

  events: {
    "click #add-list" : "showForm",
    "click a.filter-link" : "changeList",
    "click a.remove-list" : "deleteList",
    "click a.remove-item" : "deleteItem"
  },

  initialize: function (){
    //collection = lists (route is rails' #index!)
    //model will be the specific list in question
    this._showForm = false;

    this._user = Cocktailist.currentUser;
    this._user.fetch();

    this.listenTo(this._user, "sync", this.getLists);

    this.listenToOnce(this.collection, "sync", this.setModel);

    this.model = new Cocktailist.Models.List([], {user: this._user}); //placeholder model

    this.listenTo(this.collection, "update change afterModelSet changeListitems", this.render);
  },

  showForm: function (e){
    if(this._showForm){
      this._form.remove();
      this.render();
      this._showForm = false;
    } else {
      var newModel = new Cocktailist.Models.List([], {user: this._user});
      this._form = new Cocktailist.Views.ListForm({model: newModel, collection: this.collection});
      this.$el.find(".right").html(this._form.render().$el);
      this.$el.find("a#add-list").text("Cancel");
      this._showForm = true;
    };
  },

  //eventually add inline edit/rename functionality

  deleteList: function (e){
    var targetModel = this.collection.findWhere({id: $(e.currentTarget).data("list")})
    targetModel.destroy({
      url: 'api/users/'+this._user.id+'/lists/'+targetModel.id
    });
  },

  deleteItem: function (e){
    var targetItem = this.model.listitems().findWhere({id: $(e.currentTarget).data("listitem")})
    targetItem.destroy({
      url: 'api/users/'+this._user.id+'/lists/'+this.model.id+'/listitems/'+targetItem.id,
      success: function (){
        this.collection.trigger("changeListitems");
      }.bind(this)
    });
  },

  getLists: function (){
    this.collection.fetch();
  },

  setModel: function (){
    if(this.collection.length > 0){     //accounting for empty lists
      this._listShowId = this._listShowId || this.collection.at(0).id;
      this.model = this.collection.getOrFetch(this._listShowId, {url: 'api/users/'+this._user.id+'/lists', silent: true});
    };
    this.collection.trigger("afterModelSet");
  },

  changeList: function (e){
    $link = $(e.currentTarget);
    if(!$link.hasClass("bolded")){
      this._listShowId = this.collection.findWhere({name: $link.text()}).id;
      this.setModel();
    };
  },

  renderSidebar: function (){
    if(this.collection.length > 0){
      var template = this.template['side']({lists: this.collection, listShowId: this._listShowId});
      this.$el.find(".filter-list").html(template);
    } else {
      this.$el.find(".filter-list").html("<li>None yet!</li>");
    };
    return this;
  },

  render: function (res, models, options){
    // var filterList = (options && options.filterList ? options.filterList : this.liquorTypes());
    // this._listShowId = (options && options.listShowId ? options.listShowId : 1);
    // var groupType = (options && options.groupFn ? options.groupFn : function (cocktail){ return cocktail.get("liquor"); });
    // var groups = this.collection.groupBy(groupType);
    var template = this.template['main']({list: this.model});
    this.$el.html(template);

    this.renderSidebar();

    return this;
  }
});
