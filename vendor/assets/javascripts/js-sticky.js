// TO USE:
// in your document, define #sticky and #sticky-trigger (and possibly #sticky-cont)
// to change trigger from top of #sticky to bottom of #sticky, use #sticky-bottom instead of #sticky
// define a container div #sticky-cont if #sticky isn't a position: fixed or position: absolute element

// define the event on which to look for sticky elements. default is document ready
var jsStickyEventTrigger = "pageLoaded";

function moveScroller(trigger) {
  var move, scrollPos;

  var triggerPos = $("#sticky-trigger").offset().top; // always static

  var scrollEl = (trigger === "top") ? $("#sticky") : $("#sticky-bottom");

  // total = with margins
  var elTotalWidth = scrollEl.outerWidth(true);
  var elTotalHeight = scrollEl.outerHeight(true);
  // just the width of the inner content (no padding/border/margins)
  var elInnerWidth = scrollEl.css("width");
  var elLeftPos = scrollEl.offset().left;

  if (trigger === "top"){

    move = function() {
      scrollPos = $(window).scrollTop();
      if (scrollPos > triggerPos) {
        scrollEl.addClass("stickied");
        scrollEl.css({
            position: "fixed",
            top: "0",             // change as needed
            left: elLeftPos,
            width: elInnerWidth,
            zIndex: 100,
            opacity: 0.9
        });

        // need to create a "placeholder" for the element in the DOM if it
        // used to be position: static or position: relative
        if(document.getElementById("sticky-cont") !== null){
          $("#sticky-cont").css({
            width: elTotalWidth,
            height: elTotalHeight
          });
        }

      } else {
        scrollEl.removeClass("stickied");
        scrollEl.css({
            position: "",
            top: "",
            left: "",
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
      var benchmarkPos = scrollEl.offset().top + elTotalHeight;

      // if scrolling up, check to see if unstuck
      if ( initialScrollPos && (scrollPos < initialScrollPos)){
        scrollEl.removeClass("stickied");
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

      if (benchmarkPos > triggerPos) {
        // sticky it!
        // keep track of initial scroll place so can get scroll difference
        initialScrollPos = (initialScrollPos) ? initialScrollPos : scrollPos;
        stickied = true;
        scrollEl.addClass("stickied");
        scrollEl.css({
            position: "absolute",
            // may have to subtract an additional constant if your element is in a position: relative container
            // (since triggerPos is off of absolute coords)
            top: triggerPos - elTotalHeight - 0,
            width: elInnerWidth
        });
      }
    };
  }

  $(window).scroll(move);
  move();
}

// on event trigger, look for sticky elements
$(document).on(jsStickyEventTrigger, function() {
  if(document.getElementById("sticky") !== null){
    moveScroller("top");
  }

  if(document.getElementById("sticky-bottom") !== null){
    moveScroller("bottom");
  }
});
