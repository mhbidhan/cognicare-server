const caretakerLogins = require('../../models/caretakerLogins/caretakerLogins.model');
const caretakers = require('../../models/caretakers/caretakers.model');
const { getAuthToken } = require('../../utils/authentication');
const errorMessages = require('../../utils/error-messages');
const { checkPassword } = require('../../utils/password');

async function loginCaretaker(req, res) {
  try {
    const { email, password } = req.body;

    const caretakerCreds = await caretakerLogins.findOne({
      email,
    });

    if (!caretakerCreds)
      return res.status(400).json(errorMessages.invalidLogin);

    const passwordVerified = await checkPassword(
      password,
      caretakerCreds.password
    );

    if (!passwordVerified)
      return res.status(400).json(errorMessages.invalidLogin);

    const caretaker = await caretakers.findById(caretakerCreds.caretakerId);

    const token = getAuthToken(caretaker._id);

    return res.status(200).json(token);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

module.exports = {
  loginCaretaker,
};
