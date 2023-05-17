const patientRoutines = require('../../models/patient-routine/patient-routine.model');
const patients = require('../../models/patients/patients.model');
const errorMessages = require('../../utils/error-messages');

async function getAllRoutineForPatient(req, res) {
  try {
    const { patientId } = req;

    if (!patientId) return res.status(400).json('patient id required');

    const patient = await patients.findById(patientId);

    if (!patient)
      return res.status(400).json('patient ' + errorMessages.notFound);

    const routine = await patientRoutines
      .find({
        patient: { _id: patientId },
      })
      .populate('routineElements');

    res.status(200).json(routine);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function createNewPatientRoutine(req, res) {
  console.log('new routine', req.body);
  try {
    const { routineType, patient, date, routineElements } = req.body;

    if (routineType === 'special' && !date)
      return res.status(400).json('Must provide a date for special routines');

    if (!routineElements.length)
      return res.status(400).json('Atleast one routine element is required');

    const routine = await patientRoutines.create({
      routineType,
      patient,
      date,
      routineElements,
    });

    await routine.populate('routineElements');

    res.status(200).json(routine);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

module.exports = {
  getAllRoutineForPatient,
  createNewPatientRoutine,
};
