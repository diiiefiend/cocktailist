Cocktailist.Views.CocktailCat= Backbone.LiquorView.extend({
  template: {
    "main" : JST['cocktails/catShow'],
    "liquorTemp" : JST['cocktails/_catShowLiquor'],
    "barTemp" : JST['cocktails/_catShowBar']
  },

  events: {
    "click .filter-list a" : "filter",
    "click a.subtext" : "showAll",
    "mouseenter .category-show-list li" : "bounce",
    "mouseleave .category-show-list li" : "stopBounce"
  },

  initialize: function (options){
    //collection: cocktails
    this.markerArr = [];
    this.filterType = options.filterType;
    this.category = options.category;
    this.listenTo(this.collection, "sync", this.setCatColl);
  },

  setCatColl: function (){
    if(this.filterType === 'liquor'){
      this.category = (this.category === "switch" ? this.collection.at(0).get('liquor') : this.category);
      this.catCollection = this.collection.where({liquor : this.category});
    } else if(this.filterType === 'bar'){
      this.category = (this.category === "switch" ? this.collection.at(0).bar().name : this.category);
      this.catCollection = [];
      this.collection.models.forEach(function (model){
        if(model.bar().name === this.category){
          this.catCollection.push(model);
        };
      }.bind(this));
    };
    this.render();
  },

  filter: function (e){
    target = $(e.currentTarget).text();
    if(this.filterType==='liquor'){
      var coll = this.catCollection.filter(function (el){
        return el.bar().name === target;
      });
    } else if (this.filterType==='bar'){
      var coll = this.catCollection.filter(function (el){
        return el.get('liquor') === target;
      });
    };
    this.render(coll, target);
  },

  showAll: function (e){
    this.render();
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

  render: function (coll, target){
    var cocktails = coll || this.catCollection;

    var main = this.template['main']({category: this.category, cocktails: cocktails, filter: this.filterType});
    this.$el.html(main);


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

    if(this.filterType === 'liquor'){

      var liquors = this.liquorTypes();
      var bars = this.bars(this.catCollection);
      var temp = this.template['liquorTemp']({category: this.category, liquors: liquors, bars: bars, target: target});

    } else if(this.filterType === 'bar'){

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

      var liquors = this.liquorTypes(this.catCollection);
      var bars = this.bars();
      var temp = this.template['barTemp']({category: this.category, liquors: liquors, bars: bars, target: target});
    };

    this.$el.find(".right").html(temp);

    window.setTimeout(function (){
      $(".loader").hide();
      $(document).trigger("pageLoaded");
    }, 400);

    return this;
  }
});
