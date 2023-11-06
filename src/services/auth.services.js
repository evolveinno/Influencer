

const jwtUtils = require('../utils/jwtUtils');
const User = require('../models/User');

exports.loginWithEmail = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordMatch = await user.isPasswordMatch(password);

  if (!isPasswordMatch) {
    throw new Error('Invalid password');
  }

  
  const token = jwtUtils.generateToken(user._id);
  return token;
};

exports.loginWithGoogle = async (googleId) => {
  const user = await User.findOne({ googleId });

  if (!user) {
    throw new Error('User not found');
  }

  // Generate and return a JWT token here
  const token = jwtUtils.generateToken(user._id);
  return token;
};
