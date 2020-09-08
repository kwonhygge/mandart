module.exports = function (ps) {
  const express = require('express');
  const router = express.Router();
  const passport = ps;

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
    console.log(req.body);
    res.redirect('/main/create/mainbox');
  });

  router.get('/create/mainbox', ensureAuthenticated, function (req, res) {
    res.render('mainbox');
  });

  router.post('/create/mainbox', function (req, res) {
    console.log(req.body);
  });
  return router;
};
