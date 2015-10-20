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
      var liquors = this.liquorTypes(this.catCollection);
      var bars = this.bars();
      var temp = this.template['barTemp']({category: this.category, liquors: liquors, bars: bars, target: target});
    };

    this.$el.find(".right").html(temp);

    window.setTimeout(function (){ $(".loader").hide();}, 400);
    return this;
  }
});
