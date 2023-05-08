const { OKAYA_ADMIN_API_KEY } = require('../../config');

async function okayaCheckin(req, res) {
  try {
    const { videoId, status } = req.body;
    console.log('From Okaya: ', req.body);

    if (status === 'completed') {
      const data = await getCheckInInfo(videoId);
      console.log('Data: ', data);

      res.status(200).json('OK');
    }
  } catch (error) {
    console.log(error);
  }
}

async function getCheckInInfo(id) {
  try {
    const url = `https://smarttecapi2021.azurewebsites.net/api/V1/checkin/${id}`;
    const res = await fetch(url, {
      headers: { Authorization: OKAYA_ADMIN_API_KEY },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

module.exports = { okayaCheckin };