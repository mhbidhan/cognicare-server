const express = require('express');
const {
  okayaCheckin,
  getUserCheckInInfo,
} = require('../../controllers/okaya/okaya.controller');

const okayaRouter = express.Router();

okayaRouter.post('/webhook', okayaCheckin);
okayaRouter.post('/checkin', getUserCheckInInfo);

module.exports = okayaRouter;
