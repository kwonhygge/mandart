module.exports = function (ps) {
  const express = require('express');
  const router = express.Router();
  const passport = ps;
  const User = require('../lib/db.js');
  const { ensureAuthenticated } = require('./auth');

  router.get('/', ensureAuthenticated, function (req, res) {
    res.render('list');
  });

  router.get('/create', ensureAuthenticated, function (req, res) {
    res.render('create');
  });

  router.post('/create', function (req, res) {
    User.updateOne(
      { _id: req.user._id },
      {
        $push: {
          mainBox: {
            title: req.body.mainTitle,
            objective: req.body.mainObj,
            themeId: req.body.themeId,
            smallPlans: [
              {
                objective: req.body.TopLeftObj[0],
                plans: req.body.TopLeftPlan,
              },
              {
                objective: req.body.TopObj[0],
                plans: req.body.TopPlan,
              },
              {
                objective: req.body.TopRightObj[0],
                plans: req.body.TopRightPlan,
              },
              {
                objective: req.body.LeftObj[0],
                plans: req.body.LeftPlan,
              },
              {
                objective: req.body.RightObj[0],
                plans: req.body.RightPlan,
              },
              {
                objective: req.body.BottomLeftObj[0],
                plans: req.body.BottomLeftPlan,
              },
              {
                objective: req.body.BottomObj[0],
                plans: req.body.BottomPlan,
              },
              {
                objective: req.body.BottomRightObj[0],
                plans: req.body.BottomRightPlan,
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
