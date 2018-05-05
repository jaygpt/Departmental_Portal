"use strict";
module.exports = function(_){
    return{
        //setting up the indexx page
        SetRouting: function(router){
            router.get('/', this.indexPage);
            router.get('/signup',this.getSignup);
        },
        // here this is an class which have a string
        indexPage: function(req, res){
            return res.render('index');
        },
        
        getSignup : function(req,res){
             return res.render('signup');
        }
    }
}