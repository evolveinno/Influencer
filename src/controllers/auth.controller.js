const authService = require('../services/authService');
const userService = require('../services/userService');

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

exports.loginWithGoogle = async (req, res) => {
  
};
