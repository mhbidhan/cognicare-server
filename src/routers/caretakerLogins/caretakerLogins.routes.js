const express = require('express');
const {
  loginCaretaker,
} = require('../../controllers/caretakerLogins/caretakerLogins.controllers');

const caretakerLoginsRouter = express.Router();

caretakerLoginsRouter.post('/', loginCaretaker);

module.exports = caretakerLoginsRouter;
