//jshint esversion:6

//dotenv
require("dotenv").config();
//mongoose
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/objectiveDB",{useNewUrlParser:true, 
useUnifiedTopology: true, 
useCreateIndex: true, 
useFindAndModify: false });

//schema
const smallBoxSchema = new mongoose.Schema({
    objective:{
        type: String,
        required: [true,"You need main objective"]
    },
    plans:[{
        type:String
    }]

});

// const planSchema = new mongoose.Schema({
//     TopLeftPlan:{type:String},
//     TopPlan:{type:String},
//     TopRightPlan:{type:String},
//     LeftPlan:{type:String},
//     RightPlan:{type:String},
//     BottomLeft:{type:String},
//     Bottom:{type:String},
//     BottomRight:{type:String}
// });

const mainBoxSchema = new mongoose.Schema({
    title:{
        type:String,
        required: [true,"You need title"]
    },
    mainObjective:{
        type:String
    },
    mainPlans:[{
        type:String
    }]
})

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId:String,
    secret:String,
    mainBox:mainBoxSchema,
    smallBox:smallBoxSchema
});

//변수들
let themeColor = "white";
let mainObjective="";
let smallBoxObjective = "";
let title="";
let userId = "";
let mainObjId = "";
let smallObjId="";

//model 생성
const SmallBox = mongoose.model("SmallBox",smallBoxSchema);
const MainBox = mongoose.model("MainBox",mainBoxSchema);

//db 초기화와 저장
const mainBox = new MainBox({
    title: title
})
mainBox.save(function(err,mainbox){
    console.log(mainbox);
    mainObjId=mainbox.id;
});

const smallBox = new SmallBox({
    objective: smallBoxObjective
});
smallBox.save(function(err,smallbox){
    smallObjId=smallbox.id;
});


// const plansObject={
//     TopLeftPlan:"",
//     TopPlan:"",
//     TopRightPlan:"",
//     LeftPlan:"",
//     RightPlan:"",
//     BottomLeft:"",
//     Bottom:"",
//     BottomRight:""
// }

const express = require("express");
const bodyParser = require("body-parser");
const ejs=require("ejs");
//passport
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const findOrCreate=require("mongoose-findorcreate");


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

userSchema.plugin(passportLocalMongoose);
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

    req.login(user,function(err){
        if(err){
            console.log(err);
        }else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/main");
            });
        }
        
        
    });
})

app.get("/signup",function(req,res){
    res.render("signup");
})

app.get("/main",function(req,res){
    res.render("main");
})

app.get("/create",function(req,res){
    res.render("create");
})

app.post("/create",function(req,res){
    console.log(req.body.theme);
    themeColor = req.body.theme;
    title=req.body.titleText;
    MainBox.updateOne({ㄴid:mainObjId},{title:title},function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Mainbox title is Successfully updated")
        }
    })
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
        Left:req.body.Left,
        Right:req.body.Right,
        BottomLeft:req.body.BottomLeft,
        Bottom:req.body.Bottom,
        BottomRight:req.body.BottomRight
    }
    mainObjective=req.body.mainObjective;

    if (buttonName==="Save"){
        MainBox.updateOne({title:title},{
            mainPlans:Object.values(mainBox_values),
            mainObjective:mainObjective
        },function(err){
            if(err){
                console.log(err);
            }
            else{
                console.log("Successfully updated");
            }
        })

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
        console.log(req.body);
        smallBoxObjective = mainBox_values[buttonName];
        res.redirect("/smallbox");
    }
    

})

app.get("/smallbox",function(req,res){
    SmallBox.updateOne({id:smallObjId},{objective:smallBoxObjective},function(err){
        if(err){
            console.log(err);

        }
        else{
            console.log("smallbox objective is Successfully updated");

        }
    })
    res.render("smallbox",{smallBoxObjective:smallBoxObjective});
})

app.post("/smallbox",function(req,res){
    console.log(req.body);
    const smallBoxPlans={
        TopLeftBox:req.body.TopLeftBox,
        TopBox:req.body.TopBox,
        TopRightBox:req.body.TopRightBox,
        LeftBox:req.body.LeftBox,
        RightBox:req.body.RightBox,
        BottomLeftBox:req.body.BottomLeftBox,
        BottomBox:req.body.BottomBox,
        BottomRightBox:req.body.BottomRightBox
    }
    console.log(smallBoxPlans)
    const smallPlans = Object.values(smallBoxPlans);
    SmallBox.updateOne({objective:smallBoxObjective},{plans:smallPlans},function(err){
        if(err){
            console.log(err);

        }
        else{
            console.log("Successfully updated");

        }
    });
    res.redirect("/mainbox");
})

app.listen(3000,function(){
    console.log("listening on port 3000");
})