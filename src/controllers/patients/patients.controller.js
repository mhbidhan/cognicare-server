const caretakers = require('../../models/caretakers/caretakers.model');
const patients = require('../../models/patients/patients.model');
const { getPermanentAuthToken } = require('../../utils/authentication');
const errorMessages = require('../../utils/error-messages');

async function getAllPatientByCaretaker(req, res) {
  try {
    const { authUser } = req;

    const caretaker = await caretakers.findById(authUser);

    if (!caretaker)
      return res.status(404).json('caretaker ' + errorMessages.notFound);

    const patientsOfCaretaker = await patients.find({
      caretaker: { _id: authUser },
    });

    res.status(200).json(patientsOfCaretaker);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

async function getOwnData(req, res) {
  try {
    const { authUser } = req;

    const patient = await patients.findById(authUser);

    if (!patient) return res.status(404).json(patient);

    res.status(200).json(patient);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

async function getPatientById(req, res) {
  try {
    const { id } = req.params;

    const patient = await patients.findById(id);

    if (!patient) return res.status(404).json(patient);

    res.status(200).json(patient);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

async function createNewPatient(req, res) {
  try {
    const { authUser, body } = req;

    const {
      name,
      age,
      email,
      imgUrl,
      emergencyContact,
      contacts,
      gender,
      relationship,
      country,
      birthCountry,
      locale,
      livingArrangement,
    } = body;

    const caretaker = await caretakers.findById(authUser);

    if (!caretaker)
      return res.status(404).json('catetaker' + errorMessages.notFound);

    const newPaitent = await patients.create({
      caretaker: authUser,
      name,
      age,
      email,
      imgUrl,
      emergencyContact,
      contacts,
      gender,
      relationship,
      country,
      birthCountry,
      locale,
      livingArrangement,
    });
    const loginCode = getPermanentAuthToken(newPaitent._id);

    newPaitent.loginCode = loginCode;

    await newPaitent.save();

    await createSahhaProfile(newPaitent._id);

    caretaker.patients.push(newPaitent._id);

    caretaker.save();

    res.status(201).json(newPaitent);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

module.exports = {
  getAllPatientByCaretaker,
  getOwnData,
  getPatientById,
  createNewPatient,
};
