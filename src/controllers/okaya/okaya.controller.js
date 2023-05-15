const { OKAYA_ADMIN_API_KEY } = require('../../config');
const OkayaCheckIn = require('../../models/okaya-checkin/okaya-checkin.model');

async function okayaCheckin(req, res) {
  try {
    const { videoId } = req.body;
    console.log('From Okaya: ', req.body);

    if (videoId !== '12345') {
      const data = await getCheckInInfo(videoId);
      console.log('Data: ', data);

      if (
        data &&
        data.patientID &&
        data.videoLink &&
        data.transcript &&
        data.mood &&
        data.fatigueScore
      ) {
        const {
          patientID,
          utcDate,
          videoLink,
          transcript,
          mood,
          fatigueScore: fatigue,
        } = data;
        await OkayaCheckIn.create({
          patientID,
          videoId,
          utcDate,
          videoLink,
          transcript,
          mood,
          fatigue,
        });
      }

      res.status(200).json({ status: 'OK' });
    } else {
      res.status(200).json({ status: 'OK' });
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

    if (res.status === 200) return res.json();
    else return false;
  } catch (error) {
    console.log(error);
  }
}

async function getUserCheckInInfo(req, res) {
  try {
    const { patientID, startDate, endDate } = req.body;
    const data = await OkayaCheckIn.find({
      patientID,
      utcDate: { $gte: startDate, $lte: endDate },
    });
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

module.exports = { okayaCheckin, getUserCheckInInfo };
