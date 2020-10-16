module.exports = function (passport, User) {
  const express = require('express');
  const bcrypt = require('bcryptjs');
  const router = express.Router();

  router.get('/login', function (req, res) {
    if (req.isAuthenticated()) {
      res.redirect('/main');
    } else {
      const fmsg = req.flash();
      let feedback = '';
      if (fmsg.error) {
        feedback = fmsg.error[0];
      }
      res.render('login', { feedback: feedback, type: 'auth', login: false });
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
    if (req.isAuthenticated()) {
      res.redirect('/main');
    } else {
      res.render('signup', { login: false, type: 'auth' });
    }
  });

  router.post('/signup', function (req, res) {
    const { email, password, password2 } = req.body;
    let erros = [];

    if (!email || !password || !password2) {
      erros.push({ msg: 'Please Enter all fields' });
    }
    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2,
      });
    } else {
      User.findOne({ email: email }).then((user) => {
        if (user) {
          error.push({ msg: 'Email already exists' });
          res.render('signup', { errors, email, password, password2 });
        } else {
          const newUser = newUser({ name, email, password });
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

  return router;
};
