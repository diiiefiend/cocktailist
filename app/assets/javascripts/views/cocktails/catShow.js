Cocktailist.Views.CocktailCat= Backbone.LiquorView.extend({
  template: {
    "main" : JST['cocktails/catMain'],
    "categoryTemp" : JST['cocktails/_catShow'],
    "catListTemp" : JST['cocktails/_catCatList'],
    "filterListTemp" : JST['cocktails/_catFilterList']
  },

  events: {
    "click .filter-list a" : "filter",
    "click a.subtext" : "showAll",
    "click .category-list a" : "switchCatEntry",
    "click a.switch" : "swapCat",
    "mouseenter .category-show-list li" : "bounce",
    "mouseleave .category-show-list li" : "stopBounce"
  },

  initialize: function (options){
    //collection: cocktails
    this.markerArr = [];
    this.filterType = options.filterType;
    this.category = options.category;

    this.listenToOnce(this.collection, "sync", this.render);
    this.listenTo(this.collection, "sync", this.setCatColl);
  },

  swapCat: function (e){
    this.filterType = this.filterType === "bar" ? "liquor" : "bar";
    this.category = "switch";
    this.setCatColl();
    this.renderSide();
  },

  switchCatEntry: function (e){
    var target = $(e.currentTarget);
    target.parents("ul.category-list").find(".bolded").removeClass("bolded");
    target.addClass("bolded");

    var targetName = target.text();

    this.category = targetName;
    this.setCatColl();
    this.renderFilterList();
  },

  filter: function (e){
    var target = $(e.currentTarget);
    target.parents("ul.filter-list").find(".bolded").removeClass("bolded");
    target.addClass("bolded");

    var targetName = target.text();

    var coll;
    if(this.filterType==='liquor'){
      coll = this.catCollection.filter(function (cocktail){
        return cocktail.bar().name === targetName;
      });
    } else if (this.filterType==='bar'){
      coll = this.catCollection.filter(function (cocktail){
        return cocktail.get('liquor') === targetName;
      });
    };

    this.renderCategory(coll);
  },

  showAll: function (e){
    this.renderCategory();
  },

  bounce: function (e){
    if(this.filterType === 'liquor'){
      var markerId = $(e.currentTarget).data("markerid");
      var marker = this.markerArr[markerId];
      marker.setAnimation(google.maps.Animation.BOUNCE);
    };
  },

  stopBounce: function (e){
    if(this.filterType === 'liquor'){
      var markerId = $(e.currentTarget).data("markerid");
      var marker = this.markerArr[markerId];
      marker.setAnimation(null);
    };
  },

  setCatColl: function (){
    if(this.filterType === 'liquor'){
      this.category = (this.category === "switch" ? this.collection.at(0).get('liquor') : this.category);
      this.catCollection = this.collection.where({liquor : this.category});
    } else if(this.filterType === 'bar'){
      this.category = (this.category === "switch" ? this.collection.at(0).bar().name : this.category);
      this.catCollection = this.collection.models.filter(function (cocktail){
        return cocktail.bar().name === this.category;
      }.bind(this));
    };

    //update url
    Backbone.history.navigate("browse/" + this.filterType + "/" + this.category, {trigger: false});
    this.renderCategory(this.catCollection);
  },

  setMap: function (cocktails){
    //google maps stuff
    var coords = new google.maps.LatLng(cocktails[0].bar().latitude, cocktails[0].bar().longitude);

    var mapCanvas = document.getElementById('bar-map');
    var mapOptions = {
      center: coords,
      zoom: 15,
      maxZoom: 15,
      scrollwheel: false,
      disableDoubleClickZoom: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      draggable: false,
      overviewMapControl: false
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);

    var markerBounds = new google.maps.LatLngBounds();
    var markerLength;

    if(this.filterType === 'liquor'){
      markerLength = cocktails.length;
    } else {
      markerLength = 1;
    };

    var cocktail, marker;
    for(var i = 0; i < markerLength; i++){
      cocktail = cocktails[i];
      coords = new google.maps.LatLng(cocktail.bar().latitude, cocktail.bar().longitude);
      marker = new google.maps.Marker({
        position: coords
      });
      marker.setMap(map);
      markerBounds.extend(marker.position);
      this.markerArr.push(marker);
    }

    map.fitBounds(markerBounds);

    if(this.filterType === 'bar'){
      //retrieve some info on the bar, per Google Places API
      var request = {
        location: map.getCenter(),
        radius: '500',
        query: this.category
      };

      var service = new google.maps.places.PlacesService(map);
      service.textSearch(request, function (results, status){
        if(status == google.maps.places.PlacesServiceStatus.OK){

          service.getDetails({placeId: results[0].place_id}, function (place, status2){
            if(status2 == google.maps.places.PlacesServiceStatus.OK){
              var $barInfo = this.$el.find(".bar-info");
              $barInfo.html("<p>Google Rating: " + place.rating + "/5.0</p><ul>");
              var hours = place.opening_hours.weekday_text;
              hours.forEach( function (day){
                $barInfo.find("ul").append("<li>"+day+"</li>");
              });

              //style first word in the hours list
              this.$(".bar-info").find("li").each(function (){
                 var word = $(this).html();
                 var index = word.indexOf(' ');
                 if(index == -1) {
                    index = word.length;
                 }
                 $(this).html('<span class="first-word">' + word.substring(0, 3) + '</span>' + word.substring(index, word.length));
              });

            };
          }.bind(this));

        };
      }.bind(this));
    };
  },

  renderCategory: function (cocktails){
    cocktails = cocktails || this.catCollection;

    var temp = this.template['categoryTemp']({
      category: this.category,
      cocktails: cocktails,
      filter: this.filterType
    });
    this.$el.find(".left").html(temp);

    this.setMap(cocktails);
    $(document).trigger("pageLoaded");
  },

  renderFilterList: function (){
    if(this.filterType === 'liquor'){
      var bars = this.bars(this.catCollection);
      var temp = this.template['filterListTemp']({
        filterList: bars
      });
    } else if(this.filterType === 'bar'){
      var liquors = this.liquorTypes(this.catCollection);
      var temp = this.template['filterListTemp']({
        filterList: liquors
      });
    };

    this.$el.find(".right .filterList").html(temp);
  },

  renderCatList: function (){
    if(this.filterType === 'liquor'){
      var liquors = this.liquorTypes();
      var temp = this.template['catListTemp']({
        catList: liquors,
        category: this.filterType
      });
    } else if(this.filterType === 'bar'){
      var bars = this.bars();
      var temp = this.template['catListTemp']({
        catList: bars,
        category: this.filterType
      });
    };

    this.$el.find(".right .catList").html(temp);
  },

  renderSide: function (){
    this.renderFilterList();
    this.renderCatList();
  },

  render: function (){
    var temp = this.template['main']();
    this.$el.html(temp);

    this.setCatColl();
    this.renderSide();

    window.setTimeout(function (){
      $(".loader").hide();
    }, 400);

    return this;
  }
});
