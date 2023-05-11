const { generateJWT } = require('../../utils/vonage');

async function getVonageJWTToken(req, res) {
  try {
    const token = generateJWT();
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

module.exports = { getVonageJWTToken };
