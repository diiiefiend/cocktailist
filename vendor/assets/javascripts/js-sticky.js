// TO USE:
// in your document, define #scroller and #scroller-anchor
// to change trigger from top of #scroller to bottom of #scroller, use #scroller-bottom instead of #scroller

function moveScroller(trigger) {
  var move, scrollEl, scrollPos;

  var anchorPos = $("#scroller-anchor").offset().top; // always static

  var scrollEl = (trigger === "top") ? $("#scroller") : $("#scroller-bottom");

  var elWidth = scrollEl.outerWidth(true);
  var elHeight = scrollEl.outerHeight(true);

  if (trigger === "top"){

    move = function() {
      scrollPos = $(window).scrollTop();
      if (scrollPos > anchorPos) {
        scrollEl.css({
            position: "fixed",
            top: "0",
            width: "585px"
        });

        $("#scroller-cont").css({
          width: elWidth,
          height: elHeight
        });

      } else {
        scrollEl.css({
            position: "",
            top: "",
            width: ""
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
        // console.log("unstuck!");
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
            // need this bc position: absolute shrinks the width sometimes for some reason
            width: elWidth
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
