'use strict';
//jshint esversion:6

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const session = require('express-session');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//dotenv
require('dotenv').config();

//bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

//session
app.use(
  session({
    secret: 'Our little secret.',
    resave: false,
    saveUninitialized: false,
  })
);

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
        bcrypt.compare(password, foundUser.password, function (err, result) {
          if (err) {
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
  console.log('listening on port 3000');
});
