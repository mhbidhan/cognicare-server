const express = require('express');
const {
  getAllRoutineLogs,
  getRoutineLogsById,
  createNewRoutineLog,
} = require('../../controllers/routine-logs/routine-logs.controller');

const routineLogRouter = express.Router();

routineLogRouter.get('/', getAllRoutineLogs);
routineLogRouter.get('/:id', getRoutineLogsById);
routineLogRouter.post('/', createNewRoutineLog);

module.exports = routineLogRouter;
