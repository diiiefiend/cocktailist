window.Cocktailist = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Mixins: {},

  initialize: function() {
    this.currentUser = new Cocktailist.Models.CurrentUser();
    this.currentUser.fetch();

    this.siteNav = new Cocktailist.Views.Nav({el: "#nav"});
    this.userMenu = new Cocktailist.Views.UserMenu({el: "#user-menu ul"});
    this.search = new Cocktailist.Views.Searchbox({el: "#search"});

    this.mainLoadAni = $(".main-loader");

    $(document).on("pageLoaded", function (){
      // currently only used in pages with infinite scroll, ie feed and lists
      Cocktailist.scrollLoadAni = $(".scroll-loader");
      Cocktailist.scrollLoadAni.hide();

      $("a.scrollToTop").click(function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
      });
    });

    new Cocktailist.Routers.Router({$el: $("#js-main")});
    Backbone.history.start();
  }

};
