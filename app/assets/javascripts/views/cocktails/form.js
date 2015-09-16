Cocktailist.Views.CocktailsForm = Backbone.LiquorView.extend({
  template: JST['cocktails/form'],

  events: {
    "click .submit" : "create",
    "click a.toggle" : "toggleInput"
  },

  initialize: function (options){
    //model: cocktail
    //collection: cocktails
    this.listenTo(this.collection, "sync", this._liquorTypes);
    this.listenTo(this.collection, "sync", this.render);
    this.liquorTypes = options.liquorTypes;
  },

  toggleInput: function (e){
    $input = this.$el.find("input.toggle");
    $input.toggle();
    var $select = this.$el.find("select");
    if($select.attr("disabled")){
      $input.attr("name", "");
      $select.attr("disabled", false);
    } else {
      $input.attr("name", "cocktail[liquor]");
      $select.val("");
      $select.attr("disabled", true);
    };
  },

  create: function (e){
    e.preventDefault();
    var formData = this.$el.find(".cocktailForm").serializeJSON().cocktail;
    this.model.save(formData, {
      success: function (){
        this.collection.add(this.model);
        Backbone.history.navigate("#cocktails/"+this.model.id, {trigger: true});
      }.bind(this)
    });
  },

  render: function (){
    var template = this.template({entry: this.model, liquorTypes: this._liquorTypes()});
    this.$el.html(template);
    return this;
  }
});
