/*pick the camp information from: https://www.reserveamerica.com/articles/camping/11-great-summer-camping-getaways-in-the-west*/
var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    flash      = require("connect-flash"),
    seedDB     = require("./seeds"),
    methodOverride = require("method-override"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user");

//requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");

// seedDB(); //seed the database
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
//use css style
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//passport configuration
app.use(require("express-session")({
    secret: "GOALLLLLLLLL",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//every ejs file can use parameter {currentUser: req.user}
app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.currentUser = req.user;
    next();
});

app.use("/campground/:id/comment", commentRoutes);
app.use("/campground", campgroundRoutes);
app.use("/", indexRoutes);

// Campground.create({
//   name: "Monahans Sandhills State Park",
//   url: "https://www.reserveamerica.com/webphotos/racms/articles/images/fc36de23-9b7c-4c64-8afe-7ff448b3a4e7_image2_3-texas.jpg",
//   description: "This is a huge granite hill. No bathrooms. No water. Beautiful granite!"
// }, function(err, camp){
//     if(err){
//         console.log("ERROR!");
//     }
//     else{
//         console.log(camp);
//     }
// });

// var campgrounds = [
//       {name:"Yellowstone National Park", url:"https://www.reserveamerica.com/webphotos/racms/articles/images/fc36de23-9b7c-4c64-8afe-7ff448b3a4e7_image2_1-oregon.jpg"},
//       {name:"Monahans Sandhills State Park", url:"https://www.reserveamerica.com/webphotos/racms/articles/images/fc36de23-9b7c-4c64-8afe-7ff448b3a4e7_image2_3-texas.jpg"},
//       {name:"Dead Horse State Park", url:"https://www.reserveamerica.com/webphotos/racms/articles/images/fc36de23-9b7c-4c64-8afe-7ff448b3a4e7_image2_4-utah.jpg"},
//       {name:"Yampa River State Park", url:"https://www.reserveamerica.com/webphotos/racms/articles/images/fc36de23-9b7c-4c64-8afe-7ff448b3a4e7_image2_5-colorado.jpg"},
//       {name:"Whitefish Lake State Park", url:"https://www.reserveamerica.com/webphotos/racms/articles/images/fc36de23-9b7c-4c64-8afe-7ff448b3a4e7_image2_6-montana.jpg"},
//       {name:"Castle Rocks State Park", url:"https://www.reserveamerica.com/webphotos/racms/articles/images/fc36de23-9b7c-4c64-8afe-7ff448b3a4e7_image2_7-idaho.jpg"},
//       {name:"Sinks Canyon State Park", url:"https://www.reserveamerica.com/webphotos/racms/articles/images/fc36de23-9b7c-4c64-8afe-7ff448b3a4e7_image2_8-wyoming.jpg"},
//       {name:"Tahoe Donner Campground", url:"https://www.reserveamerica.com/webphotos/racms/articles/images/fc36de23-9b7c-4c64-8afe-7ff448b3a4e7_image2_2-tahoe.jpg"},
//       {name:"Cape Lookout State Park", url:"https://www.reserveamerica.com/webphotos/racms/articles/images/fc36de23-9b7c-4c64-8afe-7ff448b3a4e7_image2_9-oregon.jpg"}
//   ];

// app.listen(process.env.PORT, process.env.IP, function(){
//    console.log("The Yelpcamp server is starting!"); 
// });
app.listen(8080, function(){
   console.log("The Yelpcamp server is starting!"); 
});