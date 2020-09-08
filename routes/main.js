module.exports = function (ps) {
  const express = require('express');
  const router = express.Router();
  const passport = ps;

  router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
      const loginUserName = req.user.username;
      res.render('main');
    } else {
      res.redirect('/auth/login');
    }
  });

  router.get('/create', function (req, res) {
    res.render('create');
  });

  router.post('/create', function (req, res) {
    console.log(req.body);
    res.redirect('/main/create/mainbox');
  });

  router.get('/create/mainbox', function (req, res) {
    res.render('mainbox');
  });

  router.post('/create/mainbox', function (req, res) {
    console.log(req.body);
  });
  return router;
};
