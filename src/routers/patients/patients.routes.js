const express = require('express');
const {
  getAllPatientByCaretaker,
  getOwnData,
  getPatientById,
  createNewPatient,
  setOkayaPass,
} = require('../../controllers/patients/patients.controller');
const authentication = require('../../middlewares/authentication.middleware');

const patientRouter = express.Router();

patientRouter.get('/', authentication, getAllPatientByCaretaker);
patientRouter.get('/own/', authentication, getOwnData);
patientRouter.get('/:id', getPatientById);
patientRouter.post('/', authentication, createNewPatient);
patientRouter.put('/:id/setokayapass', authentication, setOkayaPass);

module.exports = patientRouter;
