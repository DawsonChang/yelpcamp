var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//==============================
//comments routes
//==============================

//comment new
router.get("/new", middleware.isLoggedIn, (req, res) =>{
    //find campground by ID
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
        }
        else{
            res.render("comment/new", {campground:campground});
       }
    });
});

//comment create
router.post("/", middleware.isLoggedIn, (req, res) => {
   Campground.findById(req.params.id, (err, campground) => {
       if(err){
           console.log(err);
       }
       else{
           Comment.create(req.body.comment, (err, comment) => {
              if(err){
                  console.log(err);
              } 
              else{
                  //add username and id to comment
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  //save comment
                  comment.save();
                  campground.comments.push(comment);
                  campground.save();
                  req.flash("success", "Successfully added comment");
                  res.redirect("/campground/" + campground._id);
              }
           });
       }
   });
});

//edit comment route

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.render("comment/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

//comment update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updateComment){
      if(err){
          res.redirect("back");
      } 
      else{
          res.redirect("/campground/" + req.params.id);
      }
   }); 
});

//delete comment route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } 
       else{
           req.flash("success", "Comment deleted");
           res.redirect("/campground/" + req.params.id);
       }
    });
});

module.exports = router;