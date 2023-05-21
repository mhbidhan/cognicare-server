const express = require('express');
const {
  evaluateFindColors,
} = require('../../controllers/game/game.controller');

const gameRouter = express.Router();

gameRouter.post('/findColors', evaluateFindColors);

module.exports = gameRouter;
