module.exports = function (ps) {
  const express = require('express');
  const router = express.Router();
  const passport = ps;
  const User = require('../lib/db.js');

  let themeColor = '';
  let mainObj = '';

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/auth/login');
    }
  }

  router.get('/', ensureAuthenticated, function (req, res) {
    const loginUserName = req.user.username;
    res.render('list', { login: true });
  });

  router.get('/create', ensureAuthenticated, function (req, res) {
    res.render('create', { login: true });
  });

  router.post('/create', function (req, res) {
    mainObj = req.body.mainobj;
    themeColor = req.body.choice;
    res.redirect('/main/create/mainbox');
  });

  router.get('/create/mainbox', ensureAuthenticated, function (req, res) {
    res.render('mainbox', { themeColor: themeColor });
  });

  router.post('/create/mainbox', function (req, res) {
    User.updateOne(
      { _id: req.user._id },
      {
        $push: {
          mainBox: {
            objective: mainObj,
            themeColor: themeColor,
            smallPlans: [
              {
                objective: req.body.TopLeftObj[0],
                plans: req.body.TopLeftPlan,
              },
              {
                objective: req.body.TopLeftObj[0],
                plans: req.body.TopLeftPlan,
              },
              {
                objective: req.body.TopLeftObj[0],
                plans: req.body.TopLeftPlan,
              },
              {
                objective: req.body.TopLeftObj[0],
                plans: req.body.TopLeftPlan,
              },
              {
                objective: req.body.TopLeftObj[0],
                plans: req.body.TopLeftPlan,
              },
              {
                objective: req.body.TopLeftObj[0],
                plans: req.body.TopLeftPlan,
              },
            ],
          },
        },
      },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Succesfully updated');
        }
      }
    );
    res.redirect('/main');
  });

  return router;
};
