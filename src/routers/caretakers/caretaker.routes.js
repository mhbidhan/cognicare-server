const express = require('express');
const {
  getCaretakerById,
  createNewCaretaker,
} = require('../../controllers/caretakers/caretakers.controller');

const caretakersRouter = express.Router();

caretakersRouter.get('/:id', getCaretakerById);
caretakersRouter.post('/', createNewCaretaker);

module.exports = caretakersRouter;
