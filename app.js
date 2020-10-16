'use strict';
//jshint esversion:6

//dotenv
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const flash = require('connect-flash');

const User = require('./lib/db');
const passport = require('./lib/passport')(app, User);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.isLogin = req.isAuthenticated();
  console.log(res.locals.isLogin);
  next();
});

//routers
const mainRouter = require('./routes/main')(passport);
const usersRouter = require('./routes/users')(passport, User);

app.use('/main', mainRouter);
app.use('/auth', usersRouter);

//dotenv
require('dotenv').config();

app.get('/', function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/main');
  } else {
    res.render('home', { type: 'home' });
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log('listening on port 3000');
});
