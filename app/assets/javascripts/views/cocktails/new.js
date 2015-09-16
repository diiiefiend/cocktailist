Cocktailist.Views.CocktailsNew = Backbone.CompositeView.extend({
  template: JST['cocktails/form'],

  events: {
    "click .submit" : "create"
  },

  initialize: function (){
    //model: cocktail
    //collection: cocktails
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
    var template = this.template({entry: this.model});
    this.$el.html(template);
    return this;
  }
});
