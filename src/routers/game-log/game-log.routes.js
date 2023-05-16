const express = require('express');
const {
  getAllGameLogs,
  createNewGameLog,
} = require('../../controllers/game-log/game-log.controller');

const gameLogRouter = express.Router();

gameLogRouter.get('/', getAllGameLogs);
gameLogRouter.post('/', createNewGameLog);

module.exports = gameLogRouter;