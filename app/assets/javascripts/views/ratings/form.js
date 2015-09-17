Cocktailist.Views.RatingForm = Backbone.CompositeView.extend({
  template: JST['ratings/form'],

  events: {
    "submit" : "createRating"
  },

  initialize: function (options){
    //model: rating
    //collection: ratings
    this.cocktail = options.cocktail;
    this.listenTo(this.model, "sync", this.render);
  },

  createRating: function (e){
    e.preventDefault();
    var formData = this.$el.find("form").serializeJSON().rating;
    formData.cocktail_id = this.cocktail.id
    debugger
    this.model.save(formData, {
      success: function(){
        this.collection.add(this.model);
      }.bind(this)
    });
  },

  render: function (){
    var template = this.template({rating: this.model});
    this.$el.html(template);
    return this;
  }
});
