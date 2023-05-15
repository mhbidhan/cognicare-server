const { Schema, model } = require('mongoose');

const routineLogSchema = new Schema({
  routineId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  routineElementId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: ['complete', 'incomplete'],
    required: true,
    default: 'incomplete',
  },
  timestamp: {
    type: Date,
    required: true,
    default: new Date().toISOString(),
  },
});

const routineLogs = model('Routine-Log', routineLogSchema);

module.exports = routineLogs;
