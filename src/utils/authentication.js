const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config');

function getAuthToken(userId) {
  return jwt.sign({ userId }, JWT_KEY, {
    expiresIn: '24h',
  });
}

function verifyAuthToken(token) {
  return jwt.verify(token, JWT_KEY);
}

module.exports = {
  getAuthToken,
  verifyAuthToken,
};
