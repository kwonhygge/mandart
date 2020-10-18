module.exports = function (ps) {
  const express = require('express');
  const router = express.Router();
  const passport = ps;
  const User = require('../lib/db.js');
  const { ensureAuthenticated } = require('./auth');

  router.get('/', ensureAuthenticated, function (req, res) {
    const boxes = req.user.mainBox;
    console.log(boxes);
    res.render('list', { boxes });
  });
  router.get('/list/:id', ensureAuthenticated, async function (req, res) {
    console.log(req.params.id);
    const box = await User.find(
      { _id: req.user.id },
      {
        mainBox: {
          $elemMatch: {
            _id: req.params.id,
          },
        },
      },
      {
        'mainBox.$._id': 0,
      }
    );
    if (box == null) res.redirect('/main');
    console.log(box);
    // res.render('show', { box: box[0].mainBox[0] });
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
