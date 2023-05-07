const caretakerLogins = require('../../models/caretakerLogins/caretakerLogins.model');
const { verifyAuthToken, getAuthToken } = require('../../utils/authentication');
const errorMessages = require('../../utils/error-messages');
const { checkPassword } = require('../../utils/password');

async function loginCaretaker(req, res) {
  try {
    const { email, password } = req.body;

    const caretaker = await caretakerLogins.findOne({
      email,
    });

    if (!caretaker) res.status(400).json(errorMessages.invalidLogin);

    const passwordVerified = await checkPassword(password, caretaker.password);

    if (!passwordVerified)
      return res.status(400).json(errorMessages.invalidLogin);

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
