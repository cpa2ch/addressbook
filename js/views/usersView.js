
define([
  'jquery',
  'underscore',
  'backbone',  
  'collections/users',
  'view/user',
  'views/navView'
], function($,_, Backbone, Users, UserView,NavView){
    var val = "test";
  var UsersView = Backbone.View.extend({
    model: new Users(),
    te:val,
    el: $('.user-list'),
    filter:{num1:"", fname:"", lname:""},
    nav: new NavView(),
    initialize: function (){

        var self = this;
        this.model.on('add', this.render, self);
        this.model.on('change', this.render, this);     
        this.model.on('remove', this.render, this);

        this.render();
    },
    events:{
        

    },
    render: function(){
        var self = this;


        var counter = 0;
        this.$el.html('');

        //console.log(this.filter["num1"]);
        console.log(this.model.toArray());

        _.each(this.model.toArray(), function(user,index){
            //console.log(user);
            if ((user.attributes["number1"].toLowerCase().indexOf(self.filter["num1"].toLowerCase()) > -1)&&
                (user.attributes["firstname"].toLowerCase().indexOf(self.filter["fname"].toLowerCase()) > -1)&&
                (user.attributes["lastname"].toLowerCase().indexOf(self.filter["lname"].toLowerCase()) > -1))
            {
                
                                
                
                //if ((index >= (nav.currentPage-1)*nav.perPage) && (index < nav.currentPage*nav.perPage))
                if ((counter >= (self.nav.currentPage-1)*self.nav.perPage) && (counter < self.nav.currentPage*self.nav.perPage))
                {
                    //console.log(index,nav.currentPage, nav.perPage);
                    self.$el.append((new UserView({model:user})).render().$el);     
                }
                counter +=1;
            }   
        });     
        
        this.nav.values = counter;
        //if (Math.floor(nav.values / nav.perPage)<=nav.pages) nav.currentPage = 1;
        //if (nav.currentPage > nav.pages) nav.currentPage = 1;
        //nav.currentPage = 1;
        this.nav.render();
        return this;
    },

    

});
  // Return the model for the module
  return UsersView;
});




