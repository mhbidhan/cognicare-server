const { Schema, model } = require('mongoose');

const okayaCheckInSchema = new Schema({
  patientID: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  videoId: {
    type: String,
    required: true,
  },
  utcDate: {
    type: Date,
    required: true,
  },
  videoLink: {
    type: String,
    required: true,
  },
  transcript: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    required: true,
  },
  fatigue: {
    type: Number,
    required: true,
  },
});

const OkayaCheckIn = model('okayaCheckIn', okayaCheckInSchema);

module.exports = OkayaCheckIn;
