Cocktailist.Util = {
  //for file input form resets
  resetFormElement: function ($e) {
    $e.wrap('<form>').closest('form').get(0).reset();
    $e.unwrap();
  }
};
