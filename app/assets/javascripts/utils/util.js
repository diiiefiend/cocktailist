Cocktailist.Util = {
  unique: function (arr){
    return arr.filter( function(item, i, arr){
      return arr.indexOf(item) === i;
    });
  },

  //for file input form resets
  resetFormElement: function ($e) {
    $e.wrap('<form>').closest('form').get(0).reset();
    $e.unwrap();
  }
};
