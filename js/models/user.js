
define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var User = Backbone.Model.extend({

    defaults:{
        number1:"",
        firstname:"",
        lastname:""
    },
});
  // Return the model for the module
  return User;
});

