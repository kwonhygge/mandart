//jshint esversion:6

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

app.listen(3000,function(){
    console.log("listening on port 3000");
})