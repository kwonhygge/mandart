module.exports = function (passport, User) {
  const express = require('express');
  const bcrypt = require('bcryptjs');
  const router = express.Router();
  const { forwardAuthenticated } = require('./auth');

  router.get('/login', forwardAuthenticated, function (req, res) {
    res.render('login', { type: 'auth' });
  });

  router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/main',
      failureRedirect: '/auth/login',
      failureFlash: true,
    })(req, res, next);
  });
  router.get('/signup', forwardAuthenticated, function (req, res) {
    res.render('signup', { type: 'auth' });
  });

  router.post('/signup', function (req, res) {
    const { email, password, password2 } = req.body;
    let errors = [];

    if (!email || !password || !password2) {
      errors.push({ msg: 'Please Enter all fields' });
    }
    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
      res.render('signup', {
        errors,
        email,
        password,
        password2,
      });
    } else {
      User.findOne({ email: email }).then((user) => {
        if (user) {
          error.push({ msg: 'Email already exists' });
          res.render('signup', {
            errors,
            email,
            password,
            password2,
            type: 'auth',
          });
        } else {
          const newUser = new User({ email, password });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then((user) => {
                  req.flash(
                    'success_msg',
                    'You are not registered and can log in'
                  );
                  res.redirect('/auth/login');
                })
                .catch((err) => console.log(err));
            });
          });
        }
      });
    }
  });

  router.get('/logout', function (req, res) {
    req.logout();
    req.session.save(function (err) {
      res.redirect('/');
    });
  });

  return router;
};
