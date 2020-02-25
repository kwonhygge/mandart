//jshint esversion:6

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
    plans: [{
        type: String
    }]

});

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

//model 생성
const SmallBox = mongoose.model("SmallBox",smallBoxSchema);
const MainBox = mongoose.model("MainBox",mainBoxSchema);

const smallBox = new SmallBox({
    objective:"Save money",
    plans:["Eat less","Reuse things","Make plan for buying","Distribute accounts"]
})

//themes
let themeColor = "white"

const express = require("express");
const bodyParser = require("body-parser");
const ejs=require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.render("home");
});

app.get("/login",function(req,res){
    res.render("login");
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
    const mainBox = new MainBox({
        title: req.body.titleText
    })
    // mainBox.save();
    res.redirect("/mainbox");
    
})

// app.get("/create/:themeId",function(req,res){
//     const requestedThemeId = req.params.themeId;

// })

app.get("/mainbox",function(req,res){
    res.render("mainbox",{themeColor:themeColor});
})

app.post("/mainbox",function(req,res){
    
})

app.get("/smallbox",function(req,res){
    res.render("smallbox");
})

app.listen(3000,function(){
    console.log("listening on port 3000");
})