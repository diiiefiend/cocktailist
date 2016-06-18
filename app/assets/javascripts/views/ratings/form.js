Cocktailist.Views.RatingForm = Backbone.CompositeView.extend({
  template: JST['ratings/form'],

  events: {
    "submit" : "createRating",
    "click #delete-rating" : "deleteRating",
    "mouseenter .rating-click-box" : "populateRating",
    "mouseleave .rating" : "clearRating",
    "click .rating-click-box" : "setRating"
  },

  initialize: function (options){
    //model: rating
    //collection: ratings
    this.cocktail = options.cocktail;
    if(this.model.get('rating') && this.model.get('rating')>0){
      this.ratingValue = this.model.get('rating');
    } else{
      this.ratingValue = -1;
    };
  },

  populateRating: function (e){
    e.preventDefault();
    var $cont = this.$el.find(".rating");
    $cont.find("img").remove();
    var rating = parseInt($(e.currentTarget).data("rating"));
    for(var i = 0; i < rating; i++){
      $cont.append("<img src='https://s3.amazonaws.com/cocktailist-pro/cocktails/imgs/rating-full.png' alt='*'>");
    };
  },

  clearRating: function (e){
    e.preventDefault();
    var $cont = this.$el.find(".rating");
    $cont.find("img").remove();
    this.displayRating();
  },

  setRating: function (e){
    e.preventDefault();
    this.ratingValue = parseInt($(e.currentTarget).data("rating"));
  },

  displayRating: function(){
    if(this.ratingValue > 0){
      var $cont = this.$el.find(".rating");
      for(var i = 0; i < this.ratingValue; i++){
        $cont.append("<img src='https://s3.amazonaws.com/cocktailist-pro/cocktails/imgs/rating-full.png' alt='*'>");
      }
    }
  },

  createRating: function (e){
    e.preventDefault();
    this.$el.find("button").prop("disabled", true);
    var formData = this.$el.find("form").serializeJSON().rating;
    formData.cocktail_id = this.cocktail.id;
    formData.rating_num = this.ratingValue;
    this.model.save(formData, {
      success: function(){
        this.cocktail._userRatingId=this.model.id;
        this.model.set({time: "just now"});
        this.collection.add(this.model);
        this.collection.trigger("addedComment", this.model);
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
        this.collection.trigger("removedComment", this.model);
      }.bind(this)
    });
  },

  render: function (){
    var template = this.template({rating: this.model});
    this.$el.html(template);
    this.displayRating();
    return this;
  }
});
