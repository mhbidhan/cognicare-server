const moment = require('moment');
const patientRoutines = require('../models/patient-routine/patient-routine.model');
const routineLogs = require('../models/routine-log/routine-log.model');

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

    const timeInNumber = getTimeInNumber(time);

    for (let routineElement of routineElements) {
      if (
        routineElement.startTime.timeInNumber < timeInNumber &&
        routineElement.endTime.timeInNumber > timeInNumber
      ) {
        const date = new Date();
        let dateStart = new Date(date).setHours(0, 0, 0, 0);
        let dateEnd = new Date(date).setHours(23, 59, 59, 100);

        const routineLog = await routineLogs.findOne({
          routineElementId: routineElement._id,
          timestamp: { $gte: dateStart, $lte: dateEnd },
        });

        if (routineLog) return;

        io.to(connectedUsers[routineElement.patient]).emit('taskReminder', {
          type: routineElement.activityType,
          time: routineElement.startTime.timeInString,
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

function getTimeInNumber(time) {
  const splitedTime = time.split(/:| /);
  let convertedTime;

  if (splitedTime[2] === 'AM') {
    convertedTime = splitedTime;
  } else {
    convertedTime = splitedTime.map((val, idx) =>
      idx === 0 && val !== '12' ? +val + 12 : val
    );
  }

  return +convertedTime.slice(0, 2).join('');
}

module.exports = sendTaskNotificationToPatient;
