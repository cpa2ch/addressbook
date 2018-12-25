define([
  'underscore',
  'backbone',
  'models/user'
], function(_, Backbone, User){
    var Users = Backbone.Collection.extend({
        model: User,
        sortParam: 'number1',
        sortMode: 1,
        comparator: function (a,b){
            if (a.get(this.sortParam) > b.get(this.sortParam)) return -1*this.sortMode;
            if (a.get(this.sortParam) < b.get(this.sortParam)) return this.sortMode;
            return 0;
        },

    });
  // Return the model for the module
  return Users;
});




