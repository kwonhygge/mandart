module.exports = function (ps, User, Box) {
  const express = require('express');
  const router = express.Router();
  const passport = ps;

  const { ensureAuthenticated } = require('./auth');

  router.get('/', ensureAuthenticated, async function (req, res) {
    const boxes = await Box.find({ createdBy: req.user.id });
    res.render('list', { boxes });
  });
  router.get('/list/:id', ensureAuthenticated, async function (req, res) {
    const box = await Box.findById(req.params.id);
    if (box == null) res.redirect('/main');
    console.log(box);
    res.render('show', { box, mode: "edit" });
  });

  router.delete('/list/:id', async (req, res) => {
    await Box.findByIdAndDelete(req.params.id);
    res.redirect('/main');
  });

  router.get('/create', ensureAuthenticated, function (req, res) {

    res.render('create', { mode: "create" });
  });

  router.post('/create', function (req, res) {
    console.log(req.body);
    const newbox = new Box({
      title: req.body.mainTitle,
      objective: req.body.mainObj,
      themeId: req.body.themeId,
      createdBy: req.user.id,
      smallPlans: [
        {
          objective: req.body.smallObj[0][0],
          plans: req.body.plan0,
        },
        {
          objective: req.body.smallObj[1][0],
          plans: req.body.plan1,
        },
        {
          objective: req.body.smallObj[2][0],
          plans: req.body.plan2,
        },
        {
          objective: req.body.smallObj[3][0],
          plans: req.body.plan3,
        },
        {
          objective: req.body.smallObj[4][0],
          plans: req.body.plan4,
        },
        {
          objective: req.body.smallObj[5][0],
          plans: req.body.plan5,
        },
        {
          objective: req.body.smallObj[6][0],
          plans: req.body.plan6,
        },
        {
          objective: req.body.smallObj[7][0],
          plans: req.body.plan7,
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
