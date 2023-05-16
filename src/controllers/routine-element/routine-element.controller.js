const routineElements = require('../../models/routine-element/routine-element.model');
const errorMessages = require('../../utils/error-messages');

async function createNewRoutineElement(req, res) {
  try {
    const {
      name,
      activityType,
      startTime,
      endTime,
      medicine,
      exercise,
      meal,
      contact,
      game,
    } = req.body;

    const types = ['meal', 'medicine', 'exercise', 'contact', 'game'];

    if (!types.includes(activityType))
      return res.status(400).json(errorMessages.badRequest);

    if (!req.body[activityType])
      return res
        .status(400)
        .json(activityType + ' is required to create a routine element');

    if (startTime.timeInNumber > endTime.timeInNumber)
      return res.status(400).json('Time is invalid');

    const routineElement = await routineElements.create({
      name,
      activityType,
      startTime,
      endTime,
      medicine,
      exercise,
      meal,
      contact,
      game,
    });

    return res.status(200).json(routineElement);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

module.exports = {
  createNewRoutineElement,
};
