module.exports = function (passport, User) {
  const express = require('express');
  const router = express.Router();

  router.get('/login', function (req, res) {
    if (req.isAuthenticated()) {
      res.render('main');
    } else {
      const fmsg = req.flash();
      let feedback = 'Hello';
      if (fmsg.error) {
        feedback = fmsg.error[0];
      }
      console.log(feedback);
      res.render('login', { feedback: feedback });
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

  router.post('/signup', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ email: username }, function (err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        //이미 이 아이디가 있는 경우
        if (foundUser) {
          res.redirect('/auth/signup');
        } else {
          //세션에 저장
          User.register(
            { username: req.body.username },
            req.body.password,
            function (err, user) {
              if (err) {
                res.redirect('/auth/signup');
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

  return router;
};
