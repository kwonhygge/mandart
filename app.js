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

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  secret: String,
  mainBox: {
    objective: String,
    themeColor: String,
    plans: [
      {
        type: Object,
      },
    ],
  },
});

//model 생성
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const session = require('express-session');
const findOrCreate = require('mongoose-findorcreate');
//bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//session
app.use(
  session({
    secret: 'Our little secret.',
    resave: false,
    saveUninitialized: false,
  })
);
const User = new mongoose.model('User', userSchema);

app.get('/', function (req, res) {
  res.render('home');
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.post('/login', function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ email: username }, function (err, foundUser) {
    if (err) {
      console.log('err');
      console.log(err);
    } else {
      console.log('not err');
      if (foundUser) {
        console.log('found');
        bcrypt.compare(password, foundUser.password, function (err, result) {
          if (err) {
            console.log(err);
          } else if (result === true) {
            res.redirect('/main');
          }
        });
      } else {
        res.redirect('/signup');
      }
    }
  });
});

app.get('/signup', function (req, res) {
  res.render('signup');
});

app.post('/signup', function (req, res) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    const newUser = new User({
      email: req.body.username,
      password: hash,
    });

    newUser.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/login');
      }
    });
  });
});

app.get('/main', function (req, res) {
  res.render('main');
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
  console.log(process.env.TEST);
  console.log('listening on port 3000');
});
