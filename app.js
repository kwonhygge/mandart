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

//routers
const mainRouter = require('./routes/main')(passport);
const authRouter = require('./routes/auth')(passport, User);

app.use('/main', mainRouter);
app.use('/auth', authRouter);

//dotenv
require('dotenv').config();

app.get('/', function (req, res) {
  res.render('home');
});

app.listen(process.env.PORT || 3000, function () {
  console.log('listening on port 3000');
});
