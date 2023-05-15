const routineLogs = require('../../models/routine-log/routine-log.model');
const errorMessages = require('../../utils/error-messages');

async function getAllRoutineLogs(req, res) {
  try {
    const { routineId, routineElementId } = req.query;

    let query;

    if (routineId) query = 'routineId';
    if (routineElementId) query = 'routineElementId';

    if (!query) return res.status(400).json(errorMessages.badRequest);

    const allRoutineLogs = await routineLogs.find({
      [query]: { _id: req.query[query] },
    });

    return res.status(200).json(allRoutineLogs);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

async function getRoutineLogsById(req, res) {
  try {
    const { id } = req.params;

    const routineLog = await routineLogs.findById(id);

    if (!routineLog) return res.status(404).json(errorMessages.notFound);

    return res.status(200).json(routineLog);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

async function createNewRoutineLog(req, res) {
  try {
    const { routineId, routineElementId, status } = req.body;

    const routineLog = await routineLogs.create({
      routineId,
      routineElementId,
      status,
      timestamp: new Date().toISOString(),
    });

    if (!routineLog) return res.status(400).json(errorMessages.badRequest);

    return res.status(201).json(routineLog);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

module.exports = {
  getAllRoutineLogs,
  getRoutineLogsById,
  createNewRoutineLog,
};
