const {
  amendDemographicInfo,
  analyzeProfile,
  validateLogs,
  addLog,
  getLogs,
} = require('../../utils/sahha');

async function amendDemographicInfoOfPatient(req, res) {
  try {
    const { id } = req.params;
    const data = await amendDemographicInfo(id, req.body);
    if (data) res.send(`Demographic info updated for patient: ${id}`);
    else res.send('Something went wrong.');
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

async function analyzePatientProfile(req, res) {
  try {
    const { id } = req.params;
    const { startDateTime, endDateTime } = req.body;
    const data = await analyzeProfile(id, startDateTime, endDateTime);
    if (data.status === 200) {
      const patientAnalysis = await data.json();
      res.send(patientAnalysis);
    } else
      res
        .status(206)
        .json({ status: 206, message: 'Not enough user data to analyze.' });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

async function addPatientSahhaLog(req, res) {
  try {
    const { id, type } = req.params;
    const isValid = validateLogs(type, req.body);
    console.log(isValid);
    if (isValid) {
      const data = await addLog(id, type, req.body);
      if (data) res.send(`${type} log added for patient: ${id}`);
      else res.send('Something went wrong.');
    } else res.send('Invalid logs.');
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

async function getSahhaLogsByType(req, res) {
  try {
    const { id, type } = req.params;
    const { startDate, endDate } = req.query;
    const data = await getLogs(id, type, startDate, endDate);
    if (data.status === 200) {
      const logs = await data.json();
      res.send(logs);
    } else res.send('Something went wrong.');
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

module.exports = {
  amendDemographicInfoOfPatient,
  analyzePatientProfile,
  addPatientSahhaLog,
  getSahhaLogsByType,
};
