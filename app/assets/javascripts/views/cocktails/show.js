Cocktailist.Views.CocktailShow = Backbone.CompositeView.extend({
  template: JST['cocktails/show'],

  events: {
    "click .add-to-lists li label" : "updateToList"
  },

  initialize: function (options){
    //model: cocktail
    //collection: cocktails
    window.scrollTo(0, 0);
    Cocktailist.siteNav.setActive("browse");

    this._ratings = this.model.ratings();
    this._lists = options.lists;

    this.ratingAvg = "N/A";

    this.collection.fetch();

    this.listenToOnce(this.collection, "sync", this.setSimilarCocktail);  //not sure why this doesn't trigger on refresh on this page
    this.listenToOnce(this.model, "sync", this._calcAvgRating);

    this.listenToOnce(this._lists, "sync", this._setLists);
    this.listenTo(this._lists, "sync", this.render); // only renders everything once

    // all ratings-related rendering
    // using custom events here so this doesn't fire at every initial 'add' when the collection syncs
    this.listenTo(this._ratings, "addedComment removedComment", this._calcAvgRating);
    this.listenTo(this._ratings, "addedComment removedComment", this.renderRatingIcons);
    this.listenTo(this._ratings, "addedComment removedComment", this.renderRatingComments); // updating a comment triggers addedComment anyway
    this.listenTo(this._ratings, "addedComment removedComment", this.renderForm);
  },

  updateToList: function (e){
    e.preventDefault();
    var $targetCheckbox = $(e.currentTarget).find("input");
    var listname = $targetCheckbox.val();

    var targetList = this._lists.findWhere({name: listname});
    if (targetList){
      var listitem = this.getListItem(targetList);
      if (listitem){
        //they want to remove from list
        this.deleteListItem(targetList, listitem, $targetCheckbox);
      } else {
        this.addListItem(targetList, listitem, $targetCheckbox);
      };
    };
  },

  _setLists: function (){
    this.checkedLists = [];

    this._lists.each( function (list){
      var listname = list.get('name');
      this[listname + "_listitems"] = list.listitems();

      this[listname + "_listitems"].each( function(listitem){
        if(listitem.get('cocktail_id') === this.model.id){
          this.checkedLists.push(list.get('name'));
          return;
        };
      }.bind(this));
    }.bind(this));
  },

  setSimilarCocktail: function (){
    var similarCocktails = this.collection.where({liquor: this.model.get('liquor')});
    similarCocktails.splice(_.findIndex(similarCocktails, this.model), 1);  //not sure if i should leave this out for review tmrw
    var randId = similarCocktails[Math.floor(Math.random() * similarCocktails.length)];
    if(similarCocktails.length > 0){
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
    } else {
      this._similarCocktail = "N/A";
      this._lists.fetch();
    };
  },

  _calcAvgRating: function (){
    var ratings = this._ratings.pluck("rating");
    if(ratings.length > 0){
      var sum = ratings.reduce(function (a, b) {return a+b; });
      this.ratingAvg = (sum/ratings.length).toFixed(1);
    } else {
      this.ratingAvg = "N/A";
    };
    this.renderRatingIcons();
  },

  getListItem: function (targetList){
    var listname = targetList.get('name');
    var targetItem = this[listname + "_listitems"].findWhere({cocktail_id: this.model.id});
    return targetItem;  //undefined if targetItem not found
  },

  deleteListItem: function (list, listitem, $input){
    var listname = list.get('name');
    listitem.list = list;
    listitem.destroy({
      success: function (data){
        // update our local collection
        this[listname + "_listitems"].remove(listitem);
        $input.prop("checked", false);
      }.bind(this)
    });
    return listitem;
  },

  addListItem: function (list, listitem, $input){
    var listname = list.get('name');
    var listitem = new Cocktailist.Models.Listitem([], {list: list});
    listitem.save({cocktail_id: this.model.id, list_id: list.id}, {
      success: function (data){
        // update our local collection
        this[listname + "_listitems"].add(listitem);
        $input.prop("checked", true);
      }.bind(this)
    });
  },

  renderMap: function (){
    var coords = new google.maps.LatLng(this.model.bar().latitude, this.model.bar().longitude);
    var mapCanvas = document.getElementById('bar-map');
    var mapOptions = {
      center: coords,
      zoom: 15,
      scrollwheel: false,
      disableDoubleClickZoom: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      draggable: false,
      overviewMapControl: false

    };
    var map = new google.maps.Map(mapCanvas, mapOptions);

    var marker=new google.maps.Marker({
      position: coords,
      icon: "favicon-32x32.png"
    });

    marker.setMap(map);
  },

  renderForm: function (){
    if(Cocktailist.currentUser.isSignedIn()){
      if(this.model.userRatingId() > -1){
        var rating = this._ratings.getOrFetch( this.model.userRatingId(), {cocktail: this.model} );
      } else {
        var rating = new Cocktailist.Models.Rating([], {cocktail: this.model});
      };
      var reviewFormView = new Cocktailist.Views.RatingForm({model: rating, collection: this._ratings, cocktail: this.model});
      this.$el.find("#rating-form").html(reviewFormView.render().$el);
    } else {
      this.$el.find("#rating-form").html("<p><a href='#session/new'>Log in</a> to rate!</p>");
    }

    return this;
  },

  renderRatingIcons: function (){
    if(this.ratingAvg !== "N/A"){
      var $cont = this.$el.find("#main-rating");
      var $iconBar = $cont.find(".rating");
      $iconBar.empty();
      var imgCode = "<img src='https://s3.amazonaws.com/cocktailist-pro/cocktails/imgs/rating-full.png' alt='*'>";
      for(var i=0; i < Math.floor(this.ratingAvg); i++){
        $iconBar.append(imgCode);
      };

      var partial_rating = this.ratingAvg % 1;
      $iconBar.append("<span style='overflow: hidden; display: inline-block; width: "+ Math.floor(17 * partial_rating) +"px;'>" + imgCode);
      $cont.find("strong").html(this.ratingAvg);
      $cont.find(".subtext").html(
        "(<a href='#reviews'>" + this._ratings.length +
        (this._ratings.length === 1 ? " vote" : " votes") + "</a>)"
      );
    };

    return this;
  },

  renderRatingComments: function (model){
    var $commentArea = this.$el.find("#reviews");

    // if empty, populate initially
    if($commentArea.html() && $commentArea.html().trim() === ""){
      this._ratings.each( function(rating){
        var ratingShowView = new Cocktailist.Views.RatingShow({model: rating});
        $commentArea.prepend(ratingShowView.render().$el);
      }.bind(this));
    } else {
      // otherwise we're adding or removing a comment
      if($commentArea.find("#rating-" + model.id).length){
        $commentArea.find("#rating-" + model.id).remove();
        if(this._ratings.contains(model)){
          // updating
          var ratingShowView = new Cocktailist.Views.RatingShow({model: model});
          $commentArea.prepend(ratingShowView.render().$el);
        }
      } else {
        // adding
        var ratingShowView = new Cocktailist.Views.RatingShow({model: model});
        $commentArea.prepend(ratingShowView.render().$el);
      }
    }

    return this;
  },


  render: function (){
    var template = this.template({
      cocktail: this.model,
      ratingAvg: this.ratingAvg,
      similarCocktail: this._similarCocktail,
      signedIn: Cocktailist.currentUser.isSignedIn(),
      lists: this._lists,
      checkedLists: this.checkedLists
    });
    this.$el.html(template);

    this.renderMap();
    this.renderForm();
    this.renderRatingIcons();
    this.renderRatingComments();

    window.setTimeout(function (){ $(".loader").hide();}, 800);

    return this;
  }
});
