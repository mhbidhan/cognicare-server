const { Schema, model } = require('mongoose');

const patientRoutineSchema = new Schema({
  routineType: {
    type: String,
    enum: ['daily', 'special'],
    required: true,
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  date: {
    type: Date,
    required: () => (this.routineType === 'special' ? true : false),
  },
  routineElements: {
    type: [Schema.Types.ObjectId],
    ref: 'Routine-Element',
    required: true,
  },
});

const patientRoutines = model('Patient-Routine', patientRoutineSchema);

module.exports = patientRoutines;
