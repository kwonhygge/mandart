'use strict';
//jshint esversion:6

//dotenv
require('dotenv').config();
//mongoose
const mongoose = require('mongoose');

mongoose.connect(
  `mongodb+srv://admin-dory:${process.env.MONGO_PASS}@cluster0.b1gte.mongodb.net/objectiveDB`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  secret: String,
  mainBox: {
    objective: String,
    themeColor: String,
    plans: {
      smallBox: {
        type: Array,
      },
    },
  },
});

//model 생성
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//dotenv
require('dotenv').config();

//bcrypt
const bcrypt = require('bcryptjs');
const saltRounds = 10;

//session
app.use(
  session({
    secret: 'Our little secret.',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model('User', userSchema);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', function (req, res) {
  res.render('home');
});

app.get('/login', function (req, res) {
  if (req.isAuthenticated()) {
    res.render('main');
  } else {
    res.render('login');
  }
});

app.post('/login', function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/main');
      });
    }
  });
});

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/signup', function (req, res) {
  res.render('signup');
});

app.post('/signup', function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ email: username }, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      //이미 이 아이디가 있는 경우
      if (foundUser) {
        res.redirect('/signup');
      } else {
        //세션에 저장
        User.register(
          { username: req.body.username },
          req.body.password,
          function (err, user) {
            if (err) {
              res.redirect('/signup');
            } else {
              passport.authenticate('local')(req, res, function () {
                res.redirect('/main');
              });
            }
          }
        );
      }
    }
  });
});

app.get('/main', function (req, res) {
  if (req.isAuthenticated()) {
    const loginUserName = req.user.username;
    res.render('main');
  } else {
    res.redirect('/login');
  }
});

app.get('/create', function (req, res) {
  res.render('create');
});

app.post('/create', function (req, res) {
  console.log(req.body);
  res.redirect('/mainbox');
});

app.get('/mainbox', function (req, res) {
  res.render('mainbox');
});

app.post('/mainbox', function (req, res) {
  console.log(req.body);
});

app.listen(process.env.PORT || 3000, function () {
  console.log('listening on port 3000');
});
