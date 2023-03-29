const express = require('express');
const auth = require('../middlewares/authMiddleware');

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

router.get('/dashboard', auth.ensureAuth, (req, res) => {
  res.render('dashboard');
});

module.exports = router;
