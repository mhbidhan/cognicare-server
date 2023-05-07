const { Schema, model } = require('mongoose');

const caretakerLoginSchema = new Schema({
  email: {
    type: String,
    min: 3,
    max: 255,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    min: 8,
    max: 4096,
    required: true,
  },
});

const caretakerLogins = model('Caretaker-Login', caretakerLoginSchema);

module.exports = caretakerLogins;
