const moment = require('moment');
const patientRoutines = require('../models/patient-routine/patient-routine.model');

async function sendTaskNotificationToPatient(connectedUsers, io) {
  try {
    const users = Object.keys(connectedUsers);
    if (!users.length) return;

    const allRoutines = await patientRoutines
      .find({
        $or: users.map((user) => ({
          patient: user,
        })),
      })
      .populate('routineElements');

    if (!allRoutines.length) return;

    const routineElements = allRoutines
      .map((routine) =>
        routine.routineElements.map((routineElement) => {
          routineElement.patient = routine.patient;
          routineElement.routineId = routine._id;

          return routineElement;
        })
      )
      .flat();

    if (!routineElements.length) return;

    const time = moment(new Date()).format('LT');

    for (let routineElement of routineElements) {
      if (routineElement.startTime.timeInString === time) {
        io.to(connectedUsers[routineElement.patient]).emit('taskReminder', {
          type: routineElement.activityType,
          time,
          message: routineElement.name,
          details: routineElement,
          routineId: routineElement.routineId,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendTaskNotificationToPatient;
