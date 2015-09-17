Cocktailist.Views.CocktailsForm = Backbone.LiquorView.extend({
  template: JST['cocktails/form'],

  events: {
    "submit" : "create",
    "click a.toggle-liquor" : "toggleLiquor",
    "click a.toggle-bar" : "toggleBar"
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

  create: function (e){
    e.preventDefault();
    var formData = this.$el.find("form").serializeJSON().cocktail;
    this.model.save(formData, {
      success: function (){
        this.collection.add(this.model);
        Backbone.history.navigate("#cocktails/"+this.model.id, {trigger: true});
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
