const express = require('express');
const auth = require('../middlewares/authMiddleware');
const Story = require('../models/storyModel');

const router = express.Router();

//@desc Login/Landing Page
//@route GET /

router.get('/', auth.ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  });
});

//@desc Dashboard
//@route GET /dashboard

router.get('/dashboard', auth.ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean();
    res.render('dashboard', { name: req.user.firstName, stories });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

module.exports = router;
