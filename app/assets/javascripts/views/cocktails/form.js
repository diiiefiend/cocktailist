Cocktailist.Views.CocktailsForm = Backbone.LiquorView.extend({
  template: JST['cocktails/form'],

  events: {
    "submit" : "create",
    "click a.toggle-liquor" : "toggleLiquor",
    "click a.toggle-bar" : "toggleBar",
    "change #attach-image" : "attachImage",
    "click a.remove-img" : "removeImage"
  },

  initialize: function (){
    //model: cocktail
    //collection: cocktails
    this.listenTo(this.collection, "sync", this.makeList());
    this.listenTo(this.collection, "sync", this.render);
  },

  toggleLiquor: function (e){
    $input = this.$el.find("input.toggle-liquor");
    $input.toggle();
    var $select = this.$el.find("select.toggle-liquor");
    if($select.attr("disabled")){
      $input.attr("name", "");
      $select.attr("disabled", false);
    } else {
      $input.attr("name", "cocktail[liquor]");
      $select.val("");
      $select.attr("disabled", true);
    };
  },

  toggleBar: function (e){
    $input = this.$el.find("input.toggle-bar");
    $input.toggle();
    var $select = this.$el.find("select.toggle-bar");
    if($select.attr("disabled")){
      $input.attr("name", "");
      $select.attr("disabled", false);
    } else {
      $input.eq(0).attr("name", "cocktail[bar_name]");
      $input.eq(1).attr("name", "cocktail[bar_address]");
      $select.val("");
      $select.attr("disabled", true);
    };
  },

  attachImage: function (e){
    var file = e.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function (){
      this._updatePreview(reader.result);
    }.bind(this);

    if(file){
      reader.readAsDataURL(file);
    } else {
      this._updatePreview("");
    };
  },

  _updatePreview: function (src){
    this.$el.find("#image-preview").attr("src", src);
  },

  removeImage: function (e){
    this.resetFormElement(this.$("#attach-image"));
    this._updatePreview("");
  },

  create: function (e){
    e.preventDefault();
    this.$el.find("button").prop("disabled");
    var file = this.$("#attach-image")[0].files[0];
    var formData = new FormData();
    var jsonData = this.$el.find("form").serializeJSON().cocktail;
    for (var key in jsonData){
      if(jsonData.hasOwnProperty(key)){
        formData.append("cocktail["+key+"]", jsonData[key]);
      };
    };

    if(file){
      formData.append("cocktail[img]", file);
    };
    this.model.saveFormData(formData, {
      success: function (){
        this.collection.add(this.model);
        this.$el.find("button").removeProp("disabled");
        Backbone.history.navigate("#cocktails/"+this.model.id, {trigger: true});
      }.bind(this),
      error: function (data, res){
        $("#errors").empty();
        res.responseJSON.forEach( function (error){
          $("#errors").append("<li>"+error+"</li>");
        }.bind(this))
      }.bind(this)
    });
  },


  makeList: function (){
    this.liquorTypes();
    this.bars();
  },

  render: function (){
    var template = this.template({entry: this.model, liquorTypes: this._liquors, bars: this._bars});
    this.$el.html(template);
    return this;
  }
});
