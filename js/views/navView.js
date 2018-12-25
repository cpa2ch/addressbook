define([
  'jquery',
  'underscore',
  'backbone',
  'models/user',
  'collections/users',
  'views/usersView'
], function($,_, Backbone, User, Users, usersView){

   var NavView = Backbone.View.extend({
    el: $('.navigation'),
    model: new Users(),
    perPage:5,
    values:0,
    pages:0,
    currentPage:1,
    
    events: {
        "click .changePage":"changePage",

    },

    initialize: function (){

        //console.log(this.model);  
        this.perPage = 5;
        this.values = this.model.length;
        this.pages =  Math.floor(this.values / this.perPage); 
        if (this.perPage*this.pages < this.values) this.pages +=1;
        this.currentPage = 1;
        this.render();  
        

        // this.model.forEach(function (val, index){
        // //  if ((index >= (currentPage-1)*perPage) && (index < currentPage*perPage))
        //     {

        //         //console.log (this.model[index]+index);
        // }
        // });

    },
    render:function(){
        console.log("render nav");
        this.generateList(this.currentPage);
        
        },  

    generateList: function (curr){

        this.pages =  Math.floor(this.values / this.perPage); 
        if (this.perPage*this.pages < this.values) this.pages +=1;
        this.currentPage = curr;
        if (this.currentPage > this.pages) this.currentPage = 1;
        this.$el.html('Navigation: ');
        var button = "btn-primary";
        
        for (let i = 1; i<this.pages+1; i++){
            if (i == curr) button = "btn-success";
                else button = "btn-primary";
            this.$el.append('<button data-rel="'+i+'" class="changePage btn btn-small '+'btn'+i+' '+ button +'">'+i+'</button>');
        }
    },

    changePage: function (event){

        this.currentPage = $(event.target).html();              
        this.generateList(this.currentPage);        
        usersView.render();
    },
});
  // Return the model for the module
  return NavView;
});




