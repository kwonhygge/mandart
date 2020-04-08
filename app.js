//jshint esversion:6

//dotenv
require("dotenv").config();
//mongoose
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/objectiveDB",{useNewUrlParser:true, 
useUnifiedTopology: true, 
useCreateIndex: true, 
useFindAndModify: false });

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId:String,
    secret:String,
    mainBox:{
        title:String,
        objective:String,
        plans: [{
            type:String
        }]
    },
    smallBox:{
        objective:String,
        plans: [{
            type:String
        }]
    }
});

//변수들
let themeColor = "white";
let title="";
let userId = "";

exports.isTyped = str => str.toUpperCase();

//글로벌 mainobjective와 smallobjective
let mainBox={
    title:"",
    objective:"",
    plans:["Hello"]
}

let smallBox={
    objective:"",
    plans:[]
}
//model 생성
const express = require("express");
const bodyParser = require("body-parser");
const ejs=require("ejs");
//passport
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const findOrCreate=require("mongoose-findorcreate");
//bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//session
app.use(session({
    secret: "Our little secret.",
    resave:false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

userSchema.plugin(passportLocalMongoose,{ usernameField : 'username' });
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User",userSchema);
passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
    userId=user.id;
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/mandart",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));




app.get("/",function(req,res){
    res.render("home");
});

app.get("/auth/google",
    passport.authenticate('google',{scope:["profile"]})
);

app.get('/auth/google/mandart', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/main');
  });

app.get("/login",function(req,res){
    res.render("login");
})

app.post("/login",function(req,res){
    
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    User.findOne({email:user.username},function(err,foundUser){
        if(err){
            console.log(err);

        }else{
            if(foundUser){
                bcrypt.compare(user.password,foundUser.password,function(err,result){
                    if(result===true){
                        res.redirect("/main");
                    }
                });
            }
            else{
                req.login(user,function(err){
                    if(err){
                        console.log(err);
                    }else{
                        passport.authenticate("local")(req,res,function(){
                            res.redirect("/main");
                        });
                    }
                });
            }
        }
    });

    
})

app.get("/signup",function(req,res){
    res.render("signup");
})

app.post("/signup",function(req,res){
    bcrypt.hash(req.body.password, saltRounds,function(err,hash){

        const newUser = new User({
            email: req.body.username,
            password: hash
        });
        console.log(newUser);

        newUser.save(function(err){
            if(err){
                console.log(err);  
            }else{
                res.redirect("/login");
            }
        });
    })
})

app.get("/main",function(req,res){
    res.render("main");
})

app.get("/create",function(req,res){
    res.render("create");
})

app.post("/create",function(req,res){
    themeColor = req.body.theme;
    mainBox.title=req.body.titleText;
    res.redirect("/mainbox");
})

app.get("/mainbox",function(req,res){
    res.render("mainbox",{themeColor:themeColor});
})

app.post("/mainbox",function(req,res){
    const buttonName = req.body.buttonType;
    const mainBox_values={
        TopLeft:req.body.TopLeft,
        Top:req.body.Top,
        TopRight:req.body.TopRight,
        mainObjective:req.body.mainObjective,
        Right:req.body.Right,
        BottomLeft:req.body.BottomLeft,
        Bottom:req.body.Bottom,
        BottomRigth:req.body.BottomRigth
    }

    if (buttonName==="Save"){
        User.updateOne({id:userId},{
            mainBox:mainBox,
            smallBox:smallBox
        },function(err){
            if(err){
                console.log(err);
            }else{
                console.log("Successfully updated All");
            }
        })
        res.redirect("/main");
    }
    else{
        smallBox.objective = mainBox_values[buttonName];
        res.redirect("/smallbox");
    }
})

app.get("/smallbox",function(req,res){
    res.render("smallbox",{smallBoxObjective:smallBox.objective});
    
})

app.post("/smallbox",function(req,res){
    smallBox.plans = req.body.plans;
    res.redirect("/mainbox");
})

app.listen(3000,function(){
    console.log("listening on port 3000");
})