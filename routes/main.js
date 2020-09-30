module.exports = function (ps) {
  const express = require('express');
  const router = express.Router();
  const passport = ps;
  const User = require('../lib/db.js');

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/auth/login');
    }
  }

  router.get('/', ensureAuthenticated, function (req, res) {
    const loginUserName = req.user.username;
    res.render('main');
  });

  router.get('/create', ensureAuthenticated, function (req, res) {
    res.render('create');
  });

  router.post('/create', function (req, res) {
    User.updateOne(
      { _id: req.user._id },
      { mainBox: { objective: req.body.mainObj, themeColor: req.body.choice } },
      function (err) {
        if (err) {
          console.log('error');
        } else {
          console.log('Succesfully updated');
        }
      }
    );
    res.redirect('/main/create/mainbox');
  });

  router.get('/create/mainbox', ensureAuthenticated, function (req, res) {
    console.log(req.user.mainBox.themeColor);
    res.render('mainbox', { themeColor: req.user.mainBox.themeColor });
  });

  router.post('/create/mainbox', function (req, res) {
    console.log(req.body);
    res.redirect('/main');
  });
  return router;
};
