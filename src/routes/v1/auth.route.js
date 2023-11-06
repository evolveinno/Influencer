const express = require('express');
const router = express.Router();
const passport = require('passport'); // Include Passport
const authController = require('../../controllers/authController');

router.post('/login', authController.loginWithEmail);

// Google OAuth routes
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/auth/failed' }), (req, res) => {
  res.redirect('/auth/success');
});

router.get('/auth/failed', (req, res) => {
  res.send('Google login failed');
});

router.get('/auth/success', (req, res) => {
  res.send(`Welcome ${req.user.email}`);
});

module.exports = router;
