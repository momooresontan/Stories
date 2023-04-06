const express = require('express');
const auth = require('../middlewares/authMiddleware');
const Story = require('../models/storyModel');

const router = express.Router();

//@desc Show Add Page
//@route GET /stories/add

router.get('/add', auth.ensureAuth, (req, res) => {
  res.render('stories/add');
});

//@desc Process Add Form
//@route POST /stories

router.post('/', auth.ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Story.create(req.body);
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

//@desc Show all stories
//@route GET /stories

router.get('/', auth.ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ status: 'public' })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean();

    res.render('stories/index', {
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

//@desc Show Edit Page
//@route GET /stories/edit/:id

router.get('/edit/:id', auth.ensureAuth, async (req, res) => {
  const story = await Story.findOne({
    _id: req.params.id,
  }).lean();

  if (!story) {
    return res.render('error/404');
  }

  if (story.user != req.user.id) {
    res.redirect('/stories');
  } else {
    res.render('stories/edit', {
      story,
    });
  }
});

module.exports = router;
