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
    this.$el.find("button").prop("disabled");
    var formData = this.$el.find("form").serializeJSON().rating;
    formData.cocktail_id = this.cocktail.id;
    this.model.save(formData, {
      success: function(){
        this.collection.add(this.model);
        this.$el.find("form").find("input").val("");
        this.$el.find("button").removeProp("disabled");
      }.bind(this),
      error: function (data, res){
        $("#errors").empty();
        res.responseJSON.forEach( function (error){
          $("#errors").append("<li>"+error+"</li>");
        }.bind(this))
      }.bind(this)
    });
  },

  render: function (){
    var template = this.template({rating: this.model});
    this.$el.html(template);
    return this;
  }
});
