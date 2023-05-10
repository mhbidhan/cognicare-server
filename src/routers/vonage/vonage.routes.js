const express = require('express');
const {
  getVonageJWTToken,
} = require('../../controllers/vonage/vonage.controller');

const vonageRouter = express.Router();

vonageRouter.get('/token', getVonageJWTToken);

module.exports = vonageRouter;
