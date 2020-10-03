module.exports = function (passport, User) {
  const express = require('express');
  const router = express.Router();

  router.get('/login', function (req, res) {
    if (req.isAuthenticated()) {
      res.render('list', { type: 'login' });
    } else {
      const fmsg = req.flash();
      let feedback = '';
      if (fmsg.error) {
        feedback = fmsg.error[0];
      }
      res.render('login', { feedback: feedback, type: 'login' });
    }
  });

  router.post(
    '/login',
    passport.authenticate('local', {
      successRedirect: '/main',
      failureRedirect: '/auth/login',
      failureFlash: { type: 'error', message: 'Invalid username or password.' },
    })
  );

  router.get('/logout', function (req, res) {
    req.logout();
    req.session.save(function (err) {
      res.redirect('/');
    });
  });

  router.get('/signup', function (req, res) {
    res.render('signup');
  });

  router.post('/signup', function (req, res, next) {
    User.register(
      new User({ username: req.body.username }),
      req.body.password,
      function (err) {
        if (err) {
          return next(err);
        }
        res.redirect('/main');
      }
    );
  });

  return router;
};
