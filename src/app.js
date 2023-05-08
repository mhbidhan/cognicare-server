const express = require('express');
const cors = require('cors');
const caretakersRouter = require('./routers/caretakers/caretaker.routes');
const caretakerLoginsRouter = require('./routers/caretakerLogins/caretakerLogins.routes');
const patientRouter = require('./routers/patients/patients.routes');
const okayaRouter = require('./routers/okaya/okaya.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(
  express.json({
    limit: '10mb',
  })
);

// Routers
app.use('/caretakers/login', caretakerLoginsRouter);
app.use('/caretakers', caretakersRouter);
app.use('/patients', patientRouter);
app.use('/okaya', okayaRouter);

module.exports = app;
