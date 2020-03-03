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

//model 생성
const SmallBox = mongoose.model("SmallBox",smallBoxSchema);
const MainBox = mongoose.model("MainBox",mainBoxSchema);

//변수들
let themeColor = "white";
let mainObjective="";
let smallBoxObjective = "";
let title="";

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
    title=req.body.titleText;
    const mainBox = new MainBox({
        title: title
    })
    // mainBox.save();
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
        mainBox.updateOne({title:title},{
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
        res.redirect("/home");
    }
    else{
        console.log(req.body);
        smallBoxObjective = mainBox_values[buttonName];
        res.redirect("/smallbox");
    }
    

})

app.get("/smallbox",function(req,res){
    const smallBox = new SmallBox({
        objective: smallBoxObjective
    });
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
    smallBox.updateOne({objective:smallBoxObjective},{plans:smallPlans},function(err){
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