module.exports = function (ps, User, Box) {
  const express = require('express');
  const router = express.Router();
  const passport = ps;

  const { ensureAuthenticated } = require('./auth');

  router.get('/', ensureAuthenticated, async function (req, res) {
    const boxes = await Box.find({ createdBy: req.user.id });
    console.log(boxes);
    res.render('list', { boxes });
  });
  router.get('/list/:id', ensureAuthenticated, async function (req, res) {
    const box = await Box.findById(req.params.id);
    if (box == null) res.redirect('/main');
    res.render('show', { box });
  });
  router.get('/create', ensureAuthenticated, function (req, res) {
    res.render('create');
  });

  router.post('/create', async function (req, res) {
    const newbox = new Box({
      title: req.body.mainTitle,
      objective: req.body.mainObj,
      themeId: req.body.themeId,
      createdBy: req.user.id,
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
    });
    try {
      newbox.save().then(() => {
        res.redirect('/main');
      });
    } catch (e) {
      console.log(e);
    }
  });

  return router;
};
