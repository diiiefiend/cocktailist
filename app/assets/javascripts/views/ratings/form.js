Cocktailist.Views.RatingForm = Backbone.CompositeView.extend({
  template: JST['ratings/form'],

  events: {
    "submit" : "createRating",
    "click #delete-rating" : "deleteRating"
  },

  initialize: function (options){
    //model: rating
    //collection: ratings
    this.cocktail = options.cocktail;
  },

  createRating: function (e){
    e.preventDefault();
    this.$el.find("button").prop("disabled", true);
    var formData = this.$el.find("form").serializeJSON().rating;
    formData.cocktail_id = this.cocktail.id;
    this.model.save(formData, {
      success: function(){
        this.cocktail._userRatingId=this.model.id;
        this.collection.add(this.model);
        // this.$el.find("form").find("input").val("");
        this.$el.find("button").prop("disabled", false);
      }.bind(this),
      error: function (data, res){
        this.$el.find("button").prop("disabled", false);
        $("#errors").empty();
        res.responseJSON.forEach( function (error){
          $("#errors").append("<li>"+error+"</li>");
        }.bind(this))
      }.bind(this)
    });
  },

  deleteRating: function (e){
    this.model.destroy({cocktail: this.cocktail,
      success: function (){
        this.cocktail._userRatingId = -1;
        this.collection.trigger("afterRemove");
      }.bind(this)
    });
  },

  render: function (){
    var template = this.template({rating: this.model});
    this.$el.html(template);
    return this;
  }
});
