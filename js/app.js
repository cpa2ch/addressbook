define([
  'jquery',
  'underscore',
  'backbone',
  'models/user',
  'collections/users'
   
], function($, _, Backbone,User, Users){
  var initialize = function(){

  var users = new Users();

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


var UsersView = Backbone.View.extend({
    model: users,
    el: $('.user-list'),
    filter:{num1:"", fname:"", lname:""},
    nav: nav,
    initialize: function (){

        var self = this;
        this.model.on('add', this.render, this);
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

        _.each(this.model.toArray(), function(user,index){
            //console.log(user);
            if ((user.attributes["number1"].toLowerCase().indexOf(self.filter["num1"].toLowerCase()) > -1)&&
                (user.attributes["firstname"].toLowerCase().indexOf(self.filter["fname"].toLowerCase()) > -1)&&
                (user.attributes["lastname"].toLowerCase().indexOf(self.filter["lname"].toLowerCase()) > -1))
            {          
                                
                
               
                if ((counter >= (nav.currentPage-1)*nav.perPage) && (counter < nav.currentPage*nav.perPage))
                {                  
                    self.$el.append((new UserView({model:user})).render().$el);     
                }
                counter +=1;
            }   
        });     
        
        nav.values = counter;
        nav.render();
        return this;
    },

    

});

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


    },

    renderList: function(e){
        var self = this;

        this.model.sortParam = $(e.target).attr('data-sort');
        this.model.sortMode = this.model.sortMode*(-1);
        this.model.sort();
        
        usersView.render();

    },
    
});

var NavView = Backbone.View.extend({
    el: $('.navigation'),
    model:users,
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



var sortView = new SortView();
var nav = new NavView();
var view = new UserView();
var usersView = new UsersView();




$('.login').on('click', function() {
    console.log("login");

    //$.ajaxSetup({async:false});
    var login = {
        login: $('.login-input').val(),
        pass: $('.password-input').val()
    };


    //var loginStatus = '';
    $.post('login', {
            data: JSON.stringify(login)
        }, function(loginStatus, status) {})
        .done(function(loginStatus) {
            if (loginStatus == "access") {
                $.post('getdump', {
                        data: ""
                    }, function(dump, status) {})
                    .done(function(dump) {
                        users.set(JSON.parse(dump));
                        $('.container').show();
                        $('.login-form').hide();
                    });
            } else {
                $('.container').hide();
                $('.login-form').show();
                $('.label-warning').html('Incorrect login or passowrd');
            }
        })
        .done(function() {
            $('.add-user').on('click', function() {
                if ($('.number1-input').val() !== "") {
                    var val = {
                        number1: $('.number1-input').val(),
                        firstname: $('.firstname-input').val(),
                        lastname: $('.lastname-input').val(),
                    };
                    $.post('add', {
                        data: JSON.stringify(val)
                    }, function(data, status) {
                        if (status == "success" && data == "added") {
                            var user = new User(val);
                            users.add(user);

                        } else {
                            alert("Can't add new record to")
                        }
                    });

                    $('.number1-input').val("");
                    $('.firstname-input').val("");
                    $('.lastname-input').val("");
                } else {
                    alert("Enter at least Number1");
                }

            });

            $('.restore').on('click', function() {
                $.post('restore', {
                    data: ""
                }).done(function(data) {
                    users.set(JSON.parse(data));
                })
            });
        });
});   
  }

  return {
    initialize: initialize
  };
});
