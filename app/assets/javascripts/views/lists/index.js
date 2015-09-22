Cocktailist.Views.ListsIndex = Backbone.CompositeView.extend({
  template: {
    "main" : JST['lists/index'],
    "side" : JST['lists/side']
  },

  events: {
    "click .filter-list li a" : "changeList"
  },

  initialize: function (){
    //collection = lists (route is rails' #index!)
    //model will be the specific list in question
    this._user = Cocktailist.currentUser;
    this._user.fetch();

    this.listenToOnce(this._user, "sync", this.getLists);

    this._listShowId = 1;

    this.listenToOnce(this.collection, "sync", this.setModel);

    // this.listenTo(this.collection, "change update", this.getLists);
    // this.listenTo(this.collection, "change update", this.setModel);

    this.model = new Cocktailist.Models.List([], {user: this._user});
    this.listenTo(this.collection, "update change", this.render);  //fix the infinite rendering tmrw
  },

  getLists: function (){
    this.collection.fetch();
  },

  setModel: function (){
    this.model = this.collection.getOrFetch(this._listShowId, {url: 'api/users/'+this._user.id+'/lists'});
  },

  changeList: function (e){
    $link = $(e.currentTarget);
    if(!$link.hasClass("bolded")){
      // if($link.text() === "Liquor"){
      //   this.render([],[], {filterList: this.liquorTypes(), filterType: "Liquors", groupFn: function (cocktail){ return cocktail.get("liquor"); }});
      // } else if($link.text() === "Establishment"){
      //   this.render([],[], {filterList: this.bars(), filterType: "Establishments", groupFn: function (cocktail){ return cocktail.bar().name; }});
      // };
    };
  },

  renderSidebar: function (){
    var template = this.template['side']({lists: this.collection, listShowId: this._listShowId});
    this.$el.find(".filter-list").html(template);
    return this;
  },

  render: function (res, models, options){
    // var filterList = (options && options.filterList ? options.filterList : this.liquorTypes());
    this._listShowId = (options && options.listShowId ? options.listShowId : 1);
    // var groupType = (options && options.groupFn ? options.groupFn : function (cocktail){ return cocktail.get("liquor"); });
    // var groups = this.collection.groupBy(groupType);
    var template = this.template['main']({list: this.model});
    this.$el.html(template);

    this.renderSidebar();

    return this;
  }
});
