const { Schema, model } = require('mongoose');

const patientSchema = new Schema({
  caretaker: {
    type: Schema.Types.ObjectId,
    ref: 'Caretaker',
    required: true,
  },
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
  age: {
    type: Number,
    min: 1,
    max: 200,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Gender Diverse'],
    required: true,
    default: 'Gender Diverse',
  },
  relationship: {
    type: String,
    enum: ['Single', 'Partner', 'Marital'],
    required: true,
    default: 'Marital',
  },
  country: {
    type: String,
    required: true,
    default: 'Bangladesh',
  },
  birthCountry: {
    type: String,
    required: true,
    default: 'Bangladesh',
  },
  locale: {
    type: String,
    enum: ['Urban', 'Rural'],
    required: true,
    default: 'Urban',
  },
  livingArrangement: {
    type: String,
    enum: ['Renting', 'House Owner', 'Homeless'],
    required: true,
    default: 'Renting',
  },
  imgUrl: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  loginCode: {
    type: String,
    min: 3,
    max: 255,
  },
  emergencyContact: {
    _id: false,
    name: {
      type: String,
      min: 3,
      max: 255,
      required: true,
    },
    phone: {
      type: String,
      min: 3,
      max: 255,
      required: true,
    },
    relation: {
      type: String,
      min: 3,
      max: 255,
      required: true,
    },
  },
  contacts: {
    type: [
      {
        _id: false,
        name: {
          type: String,
          min: 3,
          max: 255,
          required: true,
        },
        phone: {
          type: String,
          min: 3,
          max: 255,
          required: true,
        },
        relation: {
          type: String,
          min: 3,
          max: 255,
          required: true,
        },
      },
    ],
    required: true,
    default: [],
  },
  routine: {
    type: Schema.Types.ObjectId,
    ref: 'Patient-Routine',
    required: false,
  },
});

const patients = model('Patient', patientSchema);

module.exports = patients;
