const express = require('express');
const {
  amendDemographicInfoOfPatient,
  analyzePatientProfile,
  addPatientSahhaLog,
  getSahhaLogsByType,
} = require('../../controllers/sahha/sahha.controller');

const sahhaRouter = express.Router();

sahhaRouter.post('/info/amend/:id', amendDemographicInfoOfPatient);
sahhaRouter.post('/analyze/:id', analyzePatientProfile);
sahhaRouter.post('/:type/log/:id', addPatientSahhaLog);
sahhaRouter.get('/:type/log/:id', getSahhaLogsByType);

module.exports = sahhaRouter;
