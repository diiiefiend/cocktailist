Cocktailist.Mixins.InfiniteScroll = {
  bindScroll: function (options) {
    $(window).on("scroll", this.handleScroll.bind(this, [], options));
  },

  handleScroll: function (e, options) {
    var $doc = $(document);
    var scrolledDist = $doc.height() - window.innerHeight - $doc.scrollTop();

    if (scrolledDist < 300) {
      this.nextPageInfiniteScroll(options);
    }
  },

  nextPageInfiniteScroll: function (options) {
    if (this.requestingNextPage) return;

    this.requestingNextPage = true;
    if(options){
      options.collection.fetch({
        remove: false,
        data: {
          page: this.collection.pageNum + 1
        },
        success: function () {
          this.requestingNextPage = false;
          this.collection.pageNum++;
        }.bind(this)
      });
    } else {
      this.collection.fetch({
        remove: false,
        data: {
          page: this.collection.pageNum + 1
        },
        success: function () {
          this.requestingNextPage = false;
          this.collection.pageNum++;
        }.bind(this)
      });
    };
  }

};
