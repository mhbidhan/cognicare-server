const { Schema, model } = require('mongoose');

const caretakerSchema = new Schema({
  name: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  email: {
    type: String,
    min: 3,
    max: 255,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    min: 9,
    max: 15,
    required: true,
  },
  imgUrl: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  patients: {
    type: [Schema.Types.ObjectId],
    ref: 'Patient',
    required: true,
    default: [],
  },
});

const caretakers = model('Caretaker', caretakerSchema);

module.exports = caretakers;
