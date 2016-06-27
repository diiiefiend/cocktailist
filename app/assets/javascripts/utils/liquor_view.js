Backbone.LiquorView = Backbone.CompositeView.extend({

  liquorTypes: function (arr){
    this._liquors = this._liquors || [];
    var arrLiquors;
    if(arr){
      // passing in array of cocktails
      arrLiquors = arr.map(function (cocktail){
        return cocktail.get('liquor');
      });
    } else {
      arrLiquors = this.collection.pluck('liquor');
    };

    this._liquors = _.unique(arrLiquors);

    return this._liquors.sort();
  },

  bars: function (arr){
    this._bars = this._bars || [];
    var arrBars;

    if(arr){
      arrBars = arr.map(function (cocktail){
        return cocktail.bar().name;
      });
    } else {
      arrBars = this.collection.map(function (cocktail){
        return cocktail.bar().name;
      });
    };

    this._bars = _.unique(arrBars);

    return this._bars.sort();
  },

  // return the actual objects (not just the names)
  barsObjs: function (arr){
    this._barsObjs = this._barsObjs || [];
    var arrBars;

    if(arr){
      arrBars = arr.map(function (cocktail){
        return cocktail.bar();
      });
    } else {
      arrBars = this.collection.map(function (cocktail){
        return cocktail.bar();
      });
    };

    this._barsObj = _.unique(arrBars, false, function (bar){
      return bar.id;
    });

    return this._barsObj;
  },

  // returns a map with bar markers attached to the #bar-map element
  setUpMap: function (mapEl, cocktails, catCollection, infoBubbleText, infoBubbleCallback){
    this.markerObjs = {};
    var coords = new google.maps.LatLng(cocktails[0].bar().latitude, cocktails[0].bar().longitude);

    var mapCanvas = document.getElementById(mapEl);
    var mapOptions = {
      center: coords,
      zoom: 15,
      maxZoom: 15,
      scrollwheel: false,
      disableDoubleClickZoom: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      draggable: true,
      overviewMapControl: false,
      zoomControl: true,
      disableDefaultUI: true
    };

    this._infoBubble = new InfoBubble({
      disableAutoPan:true,
      hideCloseButton: true,
      backgroundColor: "#000",
      maxHeight: 30,
      padding: 5,
      borderRadius: 5,
      arrowSize: 5
    });

    this._map = new google.maps.Map(mapCanvas, mapOptions);

    var markerBounds = new google.maps.LatLngBounds();
    var barsObjs = this.barsObjs(cocktails);
    var barObj, marker;

    for(var i = 0; i < barsObjs.length; i++){
      barObj = barsObjs[i];
      coords = new google.maps.LatLng(barObj.latitude, barObj.longitude);
      marker = new google.maps.Marker({
        position: coords,
        icon: "favicon-32x32.png"
      });
      marker.setMap(this._map);
      markerBounds.extend(marker.position);
      this.markerObjs[barObj.name] = marker;

      var setListeners = function (barObj, marker){
        marker.addListener('mouseover', function (){
          var numDrinks = catCollection.filter(function (cocktail){
            return cocktail.bar().name === barObj.name;
          }).length;

          this._infoBubble.setContent("<div class='map-info'>" +
            "<a href='javascript:void(0);' class='bar-name'>" +
            barObj.name +
            "</a>" +
            "<br />" + numDrinks + (numDrinks > 1 ? " drinks " : " drink ") + infoBubbleText +
            "</div>");
          this._infoBubble.open(this._map, marker);
        }.bind(this));

        marker.addListener('click', function (){
          var zoomLevel = this._map.getZoom();
          if (zoomLevel < this._map.maxZoom){
            this._map.setZoom(zoomLevel+1);
            this._map.setCenter(marker.getPosition());
          }
        }.bind(this));

        marker.addListener('mouseout', function (){
          this._infoBubble.close();
        }.bind(this));
      }.bind(this);

      setListeners(barObj, marker);
    }

    google.maps.event.addListener(this._infoBubble, 'domready', function (){
      $("a.bar-name").click(function (e){
        infoBubbleCallback(e);
      }.bind(this));
    }.bind(this));

    this._map.fitBounds(markerBounds);

    return this._map;
  },

  bounce: function (markerName){
    var marker = this.markerObjs[markerName];
    marker.setAnimation(google.maps.Animation.BOUNCE);
  },

  stopBounce: function (markerName){
    var marker = this.markerObjs[markerName];
    marker.setAnimation(null);
  },
});
