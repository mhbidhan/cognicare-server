const routineLogs = require('../../models/routine-log/routine-log.model');
const errorMessages = require('../../utils/error-messages');

async function getAllRoutineLogs(req, res) {
  try {
    const { routineId, routineElementId, from, to } = req.query;

    let query;

    if (routineId) query = 'routineId';
    if (routineElementId) query = 'routineElementId';

    if (!query) return res.status(400).json(errorMessages.badRequest);

    const date = new Date();

    let dateStart = new Date(date).setHours(0, 0, 0, 0);
    let dateEnd = new Date(date).setHours(23, 59, 59, 100);

    if (from) {
      dateStart = new Date(from).setHours(0, 0, 0, 0);
      if (to) {
        dateEnd = new Date(to).setHours(23, 59, 59, 100);
      } else {
        dateEnd = new Date(date).setHours(23, 59, 59, 100);
      }
    }

    const searchParams = { timestamp: { $gte: dateStart, $lte: dateEnd } };
    searchParams[query] = { _id: req.query[query] };

    const allRoutineLogs = await routineLogs.find(searchParams);

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

async function getRoutineLogsByRoutineId(req, res) {
  try {
    const { id } = req.params;

    const routineLog = await routineLogs.find({
      routineId: { _id: id },
    });

    if (!routineLog) return res.status(404).json(errorMessages.notFound);

    return res.status(200).json(routineLog);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

async function getRoutineLogsByRoutineElementId(req, res) {
  try {
    const { id } = req.params;

    const routineLog = await routineLogs.find({
      routineElementId: { _id: id },
    });

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
  getRoutineLogsByRoutineId,
  getRoutineLogsByRoutineElementId,
};
