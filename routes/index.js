var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function(req, res){
    res.render("frontpage");
});

//===========
//AUTH routes
//===========

//show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

//sign up post route
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Yelpcamp " + user.username);
            res.redirect("/campground");
        });
    });
});

//login route

router.get("/login", function(req, res){
    res.render("login"); 
});

//login post rute

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campground",
        failureRedirect: "/login"
    }), function(req, res){

});

//log out route

router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged out!");
   res.redirect("/campground");
});

//middle ware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;