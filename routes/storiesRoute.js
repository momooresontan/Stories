const express = require('express');
const auth = require('../middlewares/authMiddleware');
const Story = require('../models/storyModel');

const router = express.Router();

//@desc Show Add Page
//@route GET /stories/add

router.get('/add', auth.ensureAuth, (req, res) => {
  res.render('stories/add');
});

module.exports = router;
