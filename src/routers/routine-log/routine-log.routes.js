const express = require('express');
const {
  getAllRoutineLogs,
  getRoutineLogsById,
  createNewRoutineLog,
  getRoutineLogsByRoutineId,
  getRoutineLogsByRoutineElementId,
} = require('../../controllers/routine-logs/routine-logs.controller');

const routineLogRouter = express.Router();

routineLogRouter.get('/', getAllRoutineLogs);
routineLogRouter.get('/:id', getRoutineLogsById);
routineLogRouter.get('/routineid/:id', getRoutineLogsByRoutineId);
routineLogRouter.get('/routineelementid/:id', getRoutineLogsByRoutineElementId);
routineLogRouter.post('/', createNewRoutineLog);

module.exports = routineLogRouter;
