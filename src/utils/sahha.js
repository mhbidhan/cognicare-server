const config = require('../config');
const logDetails = require('./logDetails.json');
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

function checkTokenValidity() {
  if (!tokenReceivingTime || !tokenDuration) return false;

  const tokenReceivingTimeMillisec = tokenReceivingTime.getTime();
  const durationMilliSec = tokenDuration * 1000;
  const currTime = Date.now();

  if (currTime - tokenReceivingTimeMillisec >= durationMilliSec) return false;
  return true;
}

async function getSahhaProfileToken(externalId) {
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

    const res = await fetch(sahhaApiBaseUrl + '/oauth/profile/token', options);
    const data = await res.json();

    return data.profileToken;
  } catch (error) {
    console.log(error);
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

async function amendDemographicInfo(externalId, info) {
  try {
    const token = await getSahhaProfileToken(externalId);
    const url = sahhaApiBaseUrl + '/profile/demographic';

    const options = {
      method: 'PUT',
      body: JSON.stringify(info),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const res = await fetch(url, options);
    return res.status === 200;
  } catch (error) {
    console.log(error);
  }
}

async function getDemographicInfo(externalId) {
  try {
    const token = await getSahhaProfileToken(externalId);
    const url = sahhaApiBaseUrl + '/profile/demographic';

    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const res = await fetch(url, options);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

async function analyzeProfile(externalId, startDateTime, endDateTime) {
  try {
    const token = await getSahhaAccountToken(externalId);
    const url = sahhaApiBaseUrl + '/profile/analyze/' + externalId;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ startDateTime, endDateTime }),
    };

    const res = await fetch(url, options);
    return res;
  } catch (error) {
    console.log(error);
  }
}

function validateLogs(type, arrLogs) {
  const details = logDetails[type];
  if (!details) return false;

  for (let i = 0; i < arrLogs.length; i++) {
    const log = arrLogs[i];

    for (const [key, value] in details) {
      if (Object.hasOwnProperty.call(log, key)) {
        if (value === 'number' && typeof log[key] !== 'number') return false;
        else if (value === 'boolean' && typeof log[key] !== 'boolean')
          return false;
        else if (Array.isArray(value) && !value.includes(log[key]))
          return false;
        else if (
          value === true &&
          typeof log[key] !== 'string' &&
          !log[key].length
        )
          return false;
      }
    }
  }

  return true;
}

async function addLog(externalId, type, info) {
  try {
    const token = await getSahhaProfileToken(externalId);
    const url = sahhaApiBaseUrl + '/profile/' + type + '/log';

    const options = {
      method: 'POST',
      body: JSON.stringify(info),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const res = await fetch(url, options);
    return res.status === 201;
  } catch (error) {
    console.log(error);
  }
}

async function getLogs(externalId, type, startDate, endDate) {
  try {
    const token = await getSahhaAccountToken();
    const url =
      sahhaApiBaseUrl +
      '/profile/' +
      type +
      '/log/' +
      externalId +
      '?startDate=' +
      startDate +
      '&endDate=' +
      endDate;

    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const res = await fetch(url, options);
    return res;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  amendDemographicInfo,
  analyzeProfile,
  createSahhaProfile,
  getSahhaAccountToken,
  getSahhaProfileToken,
  getDemographicInfo,
  validateLogs,
  addLog,
  getLogs,
};
