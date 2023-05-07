const { verifyAuthToken } = require('../utils/authentication');

async function authentication(req, res, next) {
  try {
    const token = req.headers['x-auth-token'];

    const verified = verifyAuthToken(token);

    if (!verified) return res.status(401).json('Authentication required');

    const { userId } = verified;

    req.authUser = userId;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

module.exports = authentication;
