Cocktailist.Views.ListsIndex = Backbone.CompositeView.extend({
    template: {
      "main" : JST['lists/index'],
      "side" : JST['lists/_side']
    },

    events: {
      "click #add-list" : "showForm",
      "dblclick a.filter-link" : "renameList",
      "blur .side-input" : "saveListName",
      "click a.filter-link" : "changeList",
      "click a.remove-list" : "deleteList",
      "click a.remove-item" : "deleteItem"
    },

    initialize: function (options){
      //collection = lists (route is rails' #index!)
      //model will be the specific list in question

      Cocktailist.siteNav.setActive("lists");

      if(options.options && options.options.listShowId){
        this._listShowId = options.options.listShowId;
      };
      this._showForm = false;
      this._user = Cocktailist.currentUser;
      this._user.fetch();

      this.listenTo(this._user, "sync", this.getLists);

      this.listenToOnce(this.collection, "sync", this.setModel);

      this.model = new Cocktailist.Models.List([], {user: this._user}); //placeholder model

      this.listenTo(this.collection, "change add afterModelSet changeListitems", this.render);
    },


    getLists: function (){
      this.collection.fetch();
    },

    setModel: function (reset){
      if(this.collection.length > 0){     //accounting for empty lists
        if(reset || !this._listShowId){
          this._listShowId = this.collection.at(0).id;
        };
        this.model = this.collection.getOrFetch(this._listShowId, {url: 'api/users/'+this._user.id+'/lists', silent: true});
      };
      $(window).unbind();

      this.collection.trigger("afterModelSet");
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
        this.$el.find("input#name").focus();
        this._showForm = true;
      };
    },

    renameList: function (e){
      var $target = $(e.currentTarget);
      var $input = $("<input class='side-input' type='text'>");

      $input.data('list', $target.data('list'));
      $input.val($target.text());
      $target.html($input);

      $input.focus();
    },

    saveListName: function (e){
      var list = this.collection.findWhere({id: $(e.currentTarget).data("list")});
      list.user = this._user;
      list.set('name', $(e.currentTarget).val());
      list.save();
      this.render();
    },

    deleteList: function (e){
      var targetModel = this.collection.findWhere({id: $(e.currentTarget).data("list")})
      targetModel.destroy({
        url: 'api/users/'+this._user.id+'/lists/'+targetModel.id
      });
      this.setModel(true);
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
      var template = this.template['main']({list: this.model});
      this.$el.html(template);

      this.renderSidebar();
      this.listitemView = new Cocktailist.Views.ListitemIndex({model: this.model, collection: this.model.listitems()});
      this.$el.find(".right").html(this.listitemView.render().$el);

      window.setTimeout(function (){ $(".loader").hide();}, 400);
      return this;
    },

    remove: function (){
      this.listitemView.remove();
      Backbone.View.prototype.remove.apply(this, arguments);
      this.off();
      return this;
    }
});
