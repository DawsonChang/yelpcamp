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

mongoose.connect('mongodb+srv://${user}:${password}@yelpcamp-u9vn6.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log("connected to DB!");
}).catch(err => {
    console.log(err);
})

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

const port = process.env.PORT || 8080;

app.listen(port, process.env.IP, function(){
   console.log("The Yelpcamp server is starting!"); 
});