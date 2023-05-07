const caretakerLogins = require('../../models/caretakerLogins/caretakerLogins.model');
const caretakers = require('../../models/caretakers/caretakers.model');
const errorMessages = require('../../utils/error-messages');
const { encryptPassword } = require('../../utils/password');

async function getCaretakerById(req, res) {
  try {
    const { id } = req.params;

    const caretaker = await caretakers.findById(id);

    if (!caretaker) return res.status(404).json(errorMessages.notFound);

    return res.status(200).json(caretaker);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

async function createNewCaretaker(req, res) {
  try {
    const { name, email, password, phone, imgUrl } = req.body;

    if (password.length < 8)
      return res.status(400).json('password must be 8 carecter long');

    const exists = await caretakers.findOne({ email: email });

    if (exists) return res.status(400).json(errorMessages.alreadyExists);

    const encryptedPassword = await encryptPassword(password);

    await caretakerLogins.create({
      email,
      password: encryptedPassword,
    });

    const caretaker = await caretakers.create({
      name,
      email,
      phone,
      imgUrl,
      patients: [],
    });

    return res.status(200).json(caretaker);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

module.exports = {
  getCaretakerById,
  createNewCaretaker,
};
