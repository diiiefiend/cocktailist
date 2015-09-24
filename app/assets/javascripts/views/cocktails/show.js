Cocktailist.Views.CocktailShow = Backbone.CompositeView.extend({
  template: JST['cocktails/show'],

  events: {
    "change .add-to-lists" : "addToList"
  },

  initialize: function (options){
    //model: cocktail
    //collection: cocktails
    window.scrollTo(0, 0);

    this._ratings = this.model.ratings();
    this._lists = options.lists;

    this.ratingAvg = "N/A";
    this.collection.fetch();

    this.listenToOnce(this.collection, "sync", this.setSimilarCocktail);
    this.listenToOnce(this._ratings, "sync", this._calcAvgRating);
    this.listenTo(this._ratings, "add change afterRemove", this._calcAvgRating);

    this.listenTo(this._lists, "sync", this.render);          //the main render. not sure if i like having it render just once? or render before similar cocktail as well?

    this.listenTo(this._ratings, "add change afterRemove", this.render);
    this.listenTo(this._ratings, "add change afterRemove", this.renderForm);
    this.listenTo(this._ratings, "update change", this.renderRatings); //later optimize this to only render the new comment?
  },

  getListItem: function (targetList){
    var targetItem;

    this._lists.each( function (list){
      list.listitems().each( function(listitem){
        if(listitem.get('cocktail_id') === this.model.id){
          targetItem = listitem;
          targetItem.list = targetList;
          return targetItem;
        };
      }.bind(this));
    }.bind(this));
    return targetItem || new Cocktailist.Models.Listitem([], {list: targetList});
  },

  addToList: function (e){
    var listname = $(e.currentTarget).val();
    var list = this._lists.findWhere({name: listname});
    if(list){
      this.getListItem(list).save( {cocktail_id: this.model.id, list_id: list.id}, {
        success: function (data){
          this.$el.find(".flash").html("<p class='subtext'>Successfully added!<p>");
        }.bind(this)
      });
    };
  },

  setSimilarCocktail: function (){
    debugger
    
    var similarCocktails = this.collection.where({liquor: this.model.get('liquor')});
    similarCocktails.splice(_.findIndex(similarCocktails, this.model), 1);  //not sure if i should leave this out for review tmrw
    var randId = similarCocktails[Math.floor(Math.random() * similarCocktails.length)];
    this._similarCocktail = this.collection.getOrFetch(randId, {
        success: function (){
          // this.model.trigger("afterSimilarCocktail");
          this._lists.fetch();                        //start fetching lists
        }.bind(this),
        error: function (data){
          console.log("something went wrong", data);
        }
      }
    );
  },

  _calcAvgRating: function (){
    var ratings = this._ratings.pluck("rating");
    if(ratings.length > 0){
      var sum = ratings.reduce(function (a, b) {return a+b; });
      this.ratingAvg = sum/ratings.length;
    } else {
      this.ratingAvg = "N/A";
    };
    this.render();
  },

  render: function (){
    debugger
    var template = this.template({cocktail: this.model, ratingAvg: this.ratingAvg, similarCocktail: this._similarCocktail, signedIn: Cocktailist.currentUser.isSignedIn(), lists: this._lists});
    this.$el.html(template);

    if(Cocktailist.currentUser.isSignedIn()){
      this.renderForm();
    } else {
      this.$el.find("#rating-form").html("<p><a href='#session/new'>Log in</a> to rate!</p>");  //placeholder for now
    };

    // this._ratings.each( function(rating){
    //   this.renderRatings(rating);
    // }.bind(this));

    this.renderRatings();

    return this;
  },

  renderForm: function (){
    if(this.model.userRatingId() > -1){
      var rating = this._ratings.getOrFetch( this.model.userRatingId(), {cocktail: this.model} );
    } else {
      var rating = new Cocktailist.Models.Rating([], {cocktail: this.model});
    };
    var reviewFormView = new Cocktailist.Views.RatingForm({model: rating, collection: this._ratings, cocktail: this.model});
    this.$el.find("#rating-form").html(reviewFormView.render().$el);

    return this;
  },

  renderRatings: function (){
    this.$el.find("#reviews").empty();
    this._ratings.each( function(rating){
      var ratingShowView = new Cocktailist.Views.RatingShow({model: rating});
      this.$el.find("#reviews").prepend(ratingShowView.render().$el);
    }.bind(this));
    return this;
  }
});
