const { Schema, model } = require('mongoose');

const gameLogSchema = new Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  routineElementId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: ['won', 'lost'],
    required: true,
  },
  details: {
    type: {},
    required: false,
  },
});

const gameLogs = model('Game-Log', gameLogSchema);

module.exports = gameLogs;
