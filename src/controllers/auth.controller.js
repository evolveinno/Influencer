const authService = require('../services/authService');
const userService = require('../services/userService');
const passport = require('passport');

exports.loginWithEmail = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await userService.findUserByEmail(email);

    if (!user) {
      user = await userService.registerUser(email, password);
    }


    const token = await authService.loginWithEmail(email, password);
    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.loginWithGoogle = (req, res) => {
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })(req, res);
};


exports.googleCallback = (req, res) => {
  passport.authenticate('google', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Generate and return a JWT token for the authenticated user
    const token = jwtUtils.generateToken(user._id);

    if (!token) {
      return res.status(500).json({ error: 'Token generation failed' });
    }

    // Redirect the user to a success URL with the token or handle as needed
    res.redirect(`/auth-success?token=${token}`);
  })(req, res);
};

