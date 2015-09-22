Cocktailist.Views.ListForm = Backbone.CompositeView.extend({
  template: JST['lists/form'],

  events: {
    "submit" : "createList"
  },

  initialize: function (options){
    //model: list
    //collection: lists
  },

  createList: function (e){
    e.preventDefault();

    this.$el.find("button").prop("disabled", true);
    var formData = this.$el.find("form").serializeJSON().list;
    // formData.user_id = Cocktailist.currentUser.id;

    this.model.save(formData, {
      success: function(){
        this.collection.add(this.model);
        this.$el.find("button").prop("disabled", false);
      }.bind(this),
      error: function (data, res){
        this.$el.find("button").prop("disabled", false);
        $("#errors").empty();
        res.responseJSON.forEach( function (error){
          $("#errors").append("<li>"+error+"</li>");
        }.bind(this))
      }.bind(this)
    });
  },

  render: function (){
    var template = this.template({list: this.model});
    this.$el.html(template);
    return this;
  }
});
