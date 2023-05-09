const express = require('express');
const {
  createNewPatientRoutine,
  getAllRoutineForPatient,
} = require('../../controllers/patient-routine/patient-routine.controller');
const patientAuthentication = require('../../middlewares/patient.middleware');
const authentication = require('../../middlewares/authentication.middleware');

const patientRoutinesRouter = express.Router();

patientRoutinesRouter.get('/', patientAuthentication, getAllRoutineForPatient);
patientRoutinesRouter.post('/', authentication, createNewPatientRoutine);

module.exports = patientRoutinesRouter;
