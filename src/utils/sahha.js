const config = require('../config');
const sahhaApiBaseUrl = 'https://sandbox-api.sahha.ai/api/v1';

let token;
let tokenReceivingTime;
let tokenDuration;

async function getSahhaAccountToken() {
  if (token && checkTokenValidity()) return token;
  else {
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          clientId: config.SAHHA_CLIENT_ID,
          clientSecret: config.SAHHA_CLIENT_SECRET,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await fetch(
        sahhaApiBaseUrl + '/oauth/account/token',
        options
      );
      const data = await res.json();
      token = data.accountToken;
      tokenReceivingTime = new Date();
      tokenDuration = data.expiresIn;

      return token;
    } catch (error) {
      console.log(error);
    }
  }
}

async function createSahhaProfile(externalId) {
  try {
    const apiToken = await getSahhaAccountToken();

    const options = {
      method: 'POST',
      body: JSON.stringify({ externalId }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiToken,
      },
    };

    const res = await fetch(
      sahhaApiBaseUrl + '/oauth/profile/register',
      options
    );
    const data = await res.json();

    return data.profileToken;
  } catch (error) {
    console.log(error);
  }
}

function checkTokenValidity() {
  if (!tokenReceivingTime || !tokenDuration) return false;

  const tokenReceivingTimeMillisec = tokenReceivingTime.getTime();
  const durationMilliSec = tokenDuration * 1000;
  const currTime = Date.now();

  if (currTime - tokenReceivingTimeMillisec >= durationMilliSec) return false;
  return true;
}

module.exports = { createSahhaProfile, getSahhaAccountToken };
