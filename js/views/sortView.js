
define([
  'jquery',
  'underscore',
  'backbone',
  'collections/users',
  'views/userView',
  'views/usersView',
  'views/navView'

], function($,_, Backbone, users, userView, usersView, nav){
  var SortView = Backbone.View.extend({
    el: $('.table'),
    model:users,

    initialize: function (){

    },
    events:{
        "click [data-sort]": "renderList",
        "click .filter-user": "filter",
        "click .clear-filter": "clear",
        

    },
    clear:function(){
        $('.number1-filter').val('');
        $('.firstname-filter').val('');
        $('.lastname-filter').val('');
        usersView.filter = {num1:"", fname:"", lname:""};       
        usersView.render();

    },

    filter:function(){

        
        let number1 = $('.number1-filter').val();
        let firstname = $('.firstname-filter').val();
        let lastname = $('.lastname-filter').val();


        usersView.filter = {num1:number1, fname:firstname, lname:lastname};     
        nav.currentPage = 1;
        usersView.render();

        //nav.values = $('.number1').length;
        //nav.render();
        //console.log(nav.values);
        

    },

    renderList: function(e){
        var self = this;

        this.model.sortParam = $(e.target).attr('data-sort');
        this.model.sortMode = this.model.sortMode*(-1);
        this.model.sort();
        
        usersView.render();

    },
    
});
  // Return the model for the module
  return SortView;
});

