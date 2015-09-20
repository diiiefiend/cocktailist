Backbone.BetterModel = Backbone.Model.extend({
  saveFormData: function(formData, options){
    var method = this.isNew() ? "POST" : "PUT";
    var model = this;
    $.ajax({
      url: _.result(model, "url"),
      type: method,
      data: formData,
      processData: false,
      contentType: false,
      success: function (data){
        model.set(model.parse(data));
        model.trigger('sync', model, data, options);
        options.success && options.success(model, data, options);
      },
      error: function (data){
        options.error && options.error(model, data, options);
      }
    });
  }

});
