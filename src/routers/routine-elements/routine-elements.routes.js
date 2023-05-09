const express = require('express');
const {
  createNewRoutineElement,
} = require('../../controllers/routine-element/routine-element.controller');

const routineElementsRouter = express.Router();

routineElementsRouter.post('/', createNewRoutineElement);

module.exports = routineElementsRouter;
