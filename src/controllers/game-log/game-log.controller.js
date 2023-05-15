const gameLogs = require('../../models/game-log/game-log.model');
const errorMessages = require('../../utils/error-messages');

async function getAllGameLogs(req, res) {
  try {
    const { patientId, routineElementId, date } = req.query;

    if (!patientId && !routineElementId)
      return res.status(400).json(errorMessages.badRequest);

    let query;

    if (patientId) query = 'patientId';
    if (routineElementId) query = 'routineElementId';

    const searchParams = {};
    searchParams[query] = { _id: req.query[query] };

    if (date) {
      const dateStart = new Date(date).setHours(0, 0, 0, 0);
      const dateEnd = new Date(date).setHours(23, 59, 59, 100);

      searchParams.timestamp = { $gte: dateStart, $lte: dateEnd };
    }

    const allGameLogs = await gameLogs.find(searchParams);

    res.status(200).json(allGameLogs);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

async function createNewGameLog(req, res) {
  try {
    const { routineElementId, patientId, status, details } = req.body;

    if (!routineElementId || !patientId || !status)
      return res.status(400).json(errorMessages.badRequest);

    const newGameLog = await gameLogs.create({
      routineElementId,
      patientId,
      status,
      details,
      timestamp: new Date().toISOString(),
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
