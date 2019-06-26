var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name:"Yellowstone National Park", 
        url:"https://www.reserveamerica.com/webphotos/racms/articles/images/fc36de23-9b7c-4c64-8afe-7ff448b3a4e7_image2_1-oregon.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name:"Monahans Sandhills State Park", 
        url:"https://www.reserveamerica.com/webphotos/racms/articles/images/fc36de23-9b7c-4c64-8afe-7ff448b3a4e7_image2_3-texas.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name:"Dead Horse State Park", 
        url:"https://www.reserveamerica.com/webphotos/racms/articles/images/fc36de23-9b7c-4c64-8afe-7ff448b3a4e7_image2_4-utah.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
];


function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err){
      if(err){
          console.log(err);
      } 
      else{
          console.log("remove campgrounds!");
            //add new campgrounds
            // data.forEach(function(seed){
            //     Campground.create(seed, function(err, campground){
            //       if(err){
            //           console.log(err);
            //       } 
            //       else{
            //           console.log("create a campground");
            //             //add new comments
            //             Comment.create({
            //                 text: "It's a nice place, but I wish there was internet",
            //                 author: "homer"
            //             }, function(err, comment){
            //               if(err){
            //                   console.log(err);
            //               } 
            //               else{
            //                   campground.comments.push(comment);
            //                   campground.save();
            //                   console.log("Created a comment");
            //               }
            //             });
            //       }
            //     });    
            // });
      }
    });
}

module.exports = seedDB;
