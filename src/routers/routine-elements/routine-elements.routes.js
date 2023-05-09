const express = require('express');
const {
  createNewRoutineElement,
} = require('../../controllers/routine-element/routine-element.controller');
const authentication = require('../../middlewares/authentication.middleware');

const routineElementsRouter = express.Router();

routineElementsRouter.post('/', authentication, createNewRoutineElement);

module.exports = routineElementsRouter;
