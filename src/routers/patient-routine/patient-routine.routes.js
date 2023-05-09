const express = require('express');
const {
  createNewPatientRoutine,
  getAllRoutineForPatient,
} = require('../../controllers/patient-routine/patient-routine.controller');

const patientRoutinesRouter = express.Router();

patientRoutinesRouter.get('/', getAllRoutineForPatient);
patientRoutinesRouter.post('/', createNewPatientRoutine);

module.exports = patientRoutinesRouter;
