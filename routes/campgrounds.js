var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// router.get("/", function(req, res){
//     res.render("frontpage");
// });

router.get("/", function(req, res){
    Campground.find({}, function(err, campgrounds){
       if(err){
           console.log(err);
       }
       else{
           res.render("campground/index", {campgrounds:campgrounds});    
       }
    });
});

router.post("/", middleware.isLoggedIn, function(req, res){
   var name = req.body.name;
   var price = req.body.price;
   var url = req.body.image;
   var description = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   }
   var newCampground = {name:name, price:price, url:url, description:description, author:author};
   //create a new campground and save
   Campground.create(newCampground, function(err, newlyCampground){
      if(err){
          console.log(err);
      }
      else{
          res.redirect("/campground");    
      }
   });
});

router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("campground/new"); 
});

//SHOW 
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            // console.log(foundCampground);
            res.render("campground/show", {campground: foundCampground}); 
        }
        
    });
});

//edit campground route

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campground/edit", {campground: foundCampground});
    });
});

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updated){
        if(err){
            res.redirect("/campground");
        }
        else{
            res.redirect("/campground/" + req.params.id);
        }
    })
    
});

//destory campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/campground");
       } 
       else{
           res.redirect("/campground");
       }
    });
});

module.exports = router;
