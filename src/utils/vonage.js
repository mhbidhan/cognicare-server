const Nexmo = require('nexmo');
const path = require('path');
const conf = require('../config');

const nexmo = new Nexmo({
  apiKey: conf.VONAGE_API_KEY,
  apiSecret: conf.VONAGE_API_SECRET,
  applicationId: conf.VONAGE_APP_ID,
  privateKey: Buffer.from(conf.VONAGE_PRIVATE_KEY),
});

function generateJWT() {
  const jwt = nexmo.generateJwt();
  return jwt;
}

module.exports = { generateJWT };
