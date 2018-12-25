define([
  'jquery',
  'underscore',
  'backbone',
  'models/user',
  'collections/users',


], function($,_, Backbone, User, Users){
    var UserView = Backbone.View.extend({
    //model: new User(),
    tagName: 'tr',

    initialize: function(){
        this.template = _.template($('.users-template').html());
    },

    events: {
        "click .delete-user": "delete",
        "click .edit-user": "edit",
        "click .update-user": "update",
        "click .cancel": "cancel",

    },

    cancel: function (){
        usersView.render();
    },

    update: function (){
        var self = this;
        
        var prevNum1 = $('.number1-update').attr('num1');
        var val = [prevNum1, {'number1':$('.number1-update').val(),
                    'firstname':$('.firstname-update').val(),
                    'lastname': $('.lastname-update').val(),                    
                    }]


        $.post('update', {data:JSON.stringify(val)}, function (data, status){
            if (status == "success" && data == "updated"){
                self.model.set(val[1]);
            }
            else {
                alert ("Can't update record on server");
                self.render();
            }
        });
        
        
        
    },

    edit: function(){
        $('.edit-user').hide();
        $('.delete-user').hide();
        $('.update-user').show();
        $('.cancel').show();

        var number1 = this.$('.number1').html();
        var firstname = this.$('.firstname').html();
        var lastname = this.$('.lastname').html();
        //console.log("Edit edit" + this.model.attributes["number1"]);

        this.$('.number1').html('<input type="text" num1="'+ this.model.attributes["number1"]+'" class="form-control number1-update" value="' + number1 + '">');
        this.$('.firstname').html('<input type="text" class="form-control firstname-update" value="' + firstname + '">');
        this.$('.lastname').html('<input type="text" class="form-control lastname-update" value="' + lastname + '">');


    },

    delete: function(){
        var self = this;
    
        $.post('delete', {data:JSON.stringify(this.model.attributes)}, function (data, status){
            if (status == "success" && data == "deleted"){
                self.model.destroy();
            }
            else {
                alert ("Can't delete user on server")
            }
        });
    
        
    },

    render:function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});
  // Return the model for the module
  return UserView;
});




