// TO USE:
// in your document, define #scroller and #scroller-anchor (and possibly #scroller-cont)
// to change trigger from top of #scroller to bottom of #scroller, use #scroller-bottom instead of #scroller
// define a container div #scroller-cont if #scroller isn't a position: fixed or position: absolute element

function moveScroller(trigger) {
  var move, scrollEl, scrollPos;

  var anchorPos = $("#scroller-anchor").offset().top; // always static

  var scrollEl = (trigger === "top") ? $("#scroller") : $("#scroller-bottom");

  // total = with margins
  var elTotalWidth = scrollEl.outerWidth(true);
  var elTotalHeight = scrollEl.outerHeight(true);
  // doesn't include margins
  var elHeight = scrollEl.outerHeight();
  // just the width of the inner content (no padding/border/margins)
  var elInnerWidth = scrollEl.css("width");

  if (trigger === "top"){

    move = function() {
      scrollPos = $(window).scrollTop();
      if (scrollPos > anchorPos) {
        scrollEl.css({
            position: "fixed",
            top: "0",             // change as needed
            width: elInnerWidth,
            zIndex: 100,
            opacity: 0.9
        });

        // need to create a "placeholder" for the element in the DOM if it
        // used to be position: static or position: relative
        if(document.getElementById("scroller-cont") !== null){
          $("#scroller-cont").css({
            width: elTotalWidth,
            height: elTotalHeight
          });
        }

      } else {
        scrollEl.css({
            position: "",
            top: "",
            width: "",
            zIndex: "",
            opacity: ""
        });
      }
    };
  } else if (trigger === "bottom"){
    var initialScrollPos;
    var stickied = false;

    move = function() {
      scrollPos = $(window).scrollTop();
      // pt of interest is the bottom of the element
      var triggerPos = scrollEl.offset().top + elHeight;

      // if scrolling up, check to see if unstuck
      if ( initialScrollPos && (scrollPos < initialScrollPos)){
        scrollEl.css({
            position: "",
            top: "",
            width: ""
        });
        stickied = false;
        initialScrollPos = undefined;
      }

      // otherwise, if stickied, don't bother checking the rest
      if (stickied === true){
        return;
      }

      if (triggerPos > anchorPos) {
        // sticky it!
        // keep track of initial scroll place so can get scroll difference
        initialScrollPos = (initialScrollPos) ? initialScrollPos : scrollPos;
        stickied = true;
        scrollEl.css({
            position: "absolute",
            top: anchorPos - elHeight - 250,
            width: elInnerWidth
        });
      }
    };
  }

  $(window).scroll(move);
  move();
}

// on page load, look for scroller elements
$(document).on("pageLoaded", function() {
  if(document.getElementById("scroller") !== null){
    moveScroller("top");
  }

  if(document.getElementById("scroller-bottom") !== null){
    moveScroller("bottom");
  }
});

// keeping this for posterity even though i didn't end up using it bc of too much flickering
// took FOREVER to figure out
// negative margin = (overlap between anchorPos and trigger Pos) - (delta scrolling)
//
// marginTop: Math.round((anchorPos - triggerPos) - (scrollPos - initialScrollPos))
// console.log("ap: " + anchorPos + " tp: " + triggerPos + " sp: " + scrollPos + " isp: " + initialScrollPos);
