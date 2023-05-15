const gameLogs = require('../../models/game-log/game-log.model');
const errorMessages = require('../../utils/error-messages');

async function getAllGameLogs(req, res) {
  try {
    const { patientId, routineElementId } = req.query;

    if (!patientId && !routineElementId)
      return res.status(400).json(errorMessages.badRequest);

    let query;

    if (patientId) query = 'patientId';
    if (routineElementId) query = 'routineElementId';

    const allGameLogs = await gameLogs.find({
      [query]: req.query[query],
    });

    res.status(200).json(allGameLogs);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

async function createNewGameLog(req, res) {
  try {
    const { routineElementId, patientId, status, detail } = req.body;

    if (!routineElementId || !patientId || !status)
      return res.status(400).json(errorMessages.badRequest);

    const newGameLog = await gameLogs.create({
      routineElementId,
      patientId,
      status,
      details,
    });

    return res.status(201).json(newGameLog);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

module.exports = {
  getAllGameLogs,
  createNewGameLog,
};
