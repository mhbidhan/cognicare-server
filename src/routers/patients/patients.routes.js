const express = require('express');
const {
  getAllPatientByCaretaker,
  getOwnData,
  getPatientById,
  createNewPatient,
  setOkayaPass,
  addContact,
  getPatientContacts,
} = require('../../controllers/patients/patients.controller');
const authentication = require('../../middlewares/authentication.middleware');

const patientRouter = express.Router();

patientRouter.get('/', authentication, getAllPatientByCaretaker);
patientRouter.get('/own/', authentication, getOwnData);
patientRouter.get('/:id', getPatientById);
patientRouter.get('/:id/contacts', getPatientContacts);
patientRouter.post('/', authentication, createNewPatient);
patientRouter.put('/:id/setokayapass', authentication, setOkayaPass);
patientRouter.put('/:id/addcontact', authentication, addContact);

module.exports = patientRouter;
