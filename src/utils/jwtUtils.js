const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.generateToken = (userId) => {
  const token = jwt.sign({ sub: userId }, config.secretKey, { expiresIn: '1h' });
  return token;
};
